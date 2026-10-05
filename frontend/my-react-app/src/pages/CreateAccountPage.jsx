// src/pages/CreateAccountPage.jsx
// Accessible from the sidebar as an admin tool to create new portal users
import { useState } from 'react';
import Layout from '../components/Layout';
import { useToast } from '../context/ToastContext';
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, Plus } from 'lucide-react';

const ROLES = [
  { id: 'seeker', icon: '👤', title: 'Job Seeker', desc: 'Browse and apply to jobs' },
  { id: 'recruiter', icon: '🏢', title: 'Recruiter', desc: 'Post and manage listings' },
  { id: 'admin', icon: '⚙️', title: 'Admin', desc: 'Full system access' },
];

const INITIAL_USERS = [
  { id: 1, name: 'Alex Johnson', email: 'admin@placementhub.com', role: 'Job Seeker', joined: 'Oct 1, 2026', status: 'active' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@placementhub.com', role: 'Recruiter', joined: 'Sep 15, 2026', status: 'active' },
  { id: 3, name: 'James Wong', email: 'james@placementhub.com', role: 'Admin', joined: 'Aug 5, 2026', status: 'inactive' },
];

export default function CreateAccountPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState('seeker');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required';
    if (!form.email.includes('@')) return 'Valid email is required';
    if (form.password.length < 6) return 'Password must be 6+ characters';
    return '';
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { showToast(err, 'error'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      role: ROLES.find(r2 => r2.id === role)?.title || 'Job Seeker',
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'active',
    };
    setUsers(prev => [newUser, ...prev]);
    setForm({ name: '', email: '', phone: '', password: '' });
    setLoading(false);
    setSuccess(true);
    setShowForm(false);
    showToast(`Account created for ${form.name}! ✅`, 'success');
    setTimeout(() => setSuccess(false), 3000);
  };

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const deleteUser = (id, name) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(`Account for "${name}" deleted`, 'info');
  };

  return (
    <Layout title="User Management">
      <div className="page-header">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">{users.length} registered accounts</p>
        </div>
        <button className="btn-accent" onClick={() => setShowForm(v => !v)} id="create-account-btn">
          <Plus size={16} style={{ marginRight: 6 }} />
          {showForm ? 'Cancel' : 'Create Account'}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--primary)',
          borderRadius: 'var(--radius-md)',
          padding: 28,
          boxShadow: 'var(--shadow-glow)',
          animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>
            Create New Account
          </h2>
          <form onSubmit={handleCreate} noValidate>
            {/* Role selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
              {ROLES.map(r => (
                <div
                  key={r.id}
                  className={`role-card ${role === r.id ? 'active' : ''}`}
                  onClick={() => setRole(r.id)}
                  id={`new-role-${r.id}`}
                >
                  <div className="role-card-icon">{r.icon}</div>
                  <div className="role-card-title">{r.title}</div>
                  <div className="role-card-desc">{r.desc}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="auth-form-group" style={{ margin: 0 }}>
                <label htmlFor="new-name">Full Name *</label>
                <div className="auth-input-wrap">
                  <User size={16} />
                  <input id="new-name" type="text" placeholder="Full name" value={form.name} onChange={update('name')} />
                </div>
              </div>
              <div className="auth-form-group" style={{ margin: 0 }}>
                <label htmlFor="new-email">Email *</label>
                <div className="auth-input-wrap">
                  <Mail size={16} />
                  <input id="new-email" type="email" placeholder="email@example.com" value={form.email} onChange={update('email')} />
                </div>
              </div>
              <div className="auth-form-group" style={{ margin: 0 }}>
                <label htmlFor="new-phone">Phone</label>
                <div className="auth-input-wrap">
                  <Phone size={16} />
                  <input id="new-phone" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={update('phone')} />
                </div>
              </div>
              <div className="auth-form-group" style={{ margin: 0 }}>
                <label htmlFor="new-password">Password *</label>
                <div className="auth-input-wrap">
                  <Lock size={16} />
                  <input id="new-password" type={showPw ? 'text' : 'password'} placeholder="Min. 6 characters" value={form.password} onChange={update('password')} />
                  <button type="button" className="eye-btn" onClick={() => setShowPw(p => !p)}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button type="submit" className="btn-primary" id="submit-create-account" style={{ maxWidth: 220, opacity: loading ? 0.8 : 1 }} disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
              <button type="button" className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Users table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                    }}>
                      {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="job-tag type" style={{ padding: '4px 10px' }}>{u.role}</span>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{u.joined}</td>
                <td>
                  <span className={`status-badge ${u.status === 'active' ? 'offered' : 'rejected'}`}>
                    {u.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn-outline btn-sm"
                      id={`toggle-status-${u.id}`}
                      onClick={() => toggleStatus(u.id)}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      className="btn-sm"
                      id={`delete-user-${u.id}`}
                      style={{ padding: '7px 14px', border: '1.5px solid var(--danger)', color: 'var(--danger)', borderRadius: 20, background: 'transparent', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                      onClick={() => deleteUser(u.id, u.name)}
                      onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
