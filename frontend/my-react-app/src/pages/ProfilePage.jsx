// src/pages/ProfilePage.jsx
import { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Camera, Plus } from 'lucide-react';

const DEFAULT_SKILLS = ['React', 'TypeScript', 'Node.js', 'CSS', 'Git'];

export default function ProfilePage() {
  const { user, login } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    title: 'Senior Frontend Developer',
    company: 'Freelance',
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications. I love turning complex problems into simple, beautiful solutions.',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexj',
    website: 'alexjohnson.dev',
    experience: '5 years',
    education: 'B.S. Computer Science, MIT',
  });

  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [skillInput, setSkillInput] = useState('');

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills(prev => [...prev, s]);
      setSkillInput('');
    }
  };

  const removeSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

  const handleSave = () => {
    login({ ...user, name: form.name, email: form.email });
    showToast('Profile updated successfully! ✅', 'success');
  };

  const initials = form.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Layout title="My Profile">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Manage your personal information and preferences</p>
        </div>
      </div>

      <div className="profile-card">
        {/* Banner */}
        <div className="profile-banner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" id="profile-avatar">{initials}</div>
          </div>
          <button style={{
            position: 'absolute', right: 20, bottom: 12,
            background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)',
            borderRadius: 20, padding: '7px 14px', color: '#fff', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
            backdropFilter: 'blur(4px)',
          }}
          id="change-photo-btn"
          onClick={() => showToast('Photo upload coming soon!', 'info')}
          >
            <Camera size={14} /> Change Photo
          </button>
        </div>

        <div className="profile-info-section">
          <div className="profile-name">{form.name}</div>
          <div className="profile-role">{form.title} · {user?.role || 'Job Seeker'}</div>

          <div className="profile-fields">
            <div className="profile-field">
              <label>Full Name</label>
              <input id="profile-name" type="text" value={form.name} onChange={update('name')} />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input id="profile-email" type="email" value={form.email} onChange={update('email')} />
            </div>
            <div className="profile-field">
              <label>Phone</label>
              <input id="profile-phone" type="tel" value={form.phone} onChange={update('phone')} />
            </div>
            <div className="profile-field">
              <label>Location</label>
              <input id="profile-location" type="text" value={form.location} onChange={update('location')} />
            </div>
            <div className="profile-field">
              <label>Job Title</label>
              <input id="profile-title" type="text" value={form.title} onChange={update('title')} />
            </div>
            <div className="profile-field">
              <label>Current Company</label>
              <input id="profile-company" type="text" value={form.company} onChange={update('company')} />
            </div>
            <div className="profile-field">
              <label>Experience</label>
              <select id="profile-experience" value={form.experience} onChange={update('experience')}>
                {['< 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '6–10 years', '10+ years'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="profile-field">
              <label>Education</label>
              <input id="profile-education" type="text" value={form.education} onChange={update('education')} />
            </div>
            <div className="profile-field full-width">
              <label>Bio</label>
              <textarea
                id="profile-bio"
                rows={3}
                value={form.bio}
                onChange={update('bio')}
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: 14, background: 'var(--bg-main)', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.6 }}
              />
            </div>
            <div className="profile-field">
              <label>LinkedIn</label>
              <input id="profile-linkedin" type="url" value={form.linkedin} onChange={update('linkedin')} />
            </div>
            <div className="profile-field">
              <label>GitHub</label>
              <input id="profile-github" type="url" value={form.github} onChange={update('github')} />
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginTop: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.8 }}>Skills</label>
            <div className="skills-wrap">
              {skills.map(s => (
                <div key={s} className="skill-tag">
                  {s}
                  <button onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>×</button>
                </div>
              ))}
            </div>
            <div className="skill-input-row">
              <input
                id="skill-input"
                type="text"
                placeholder="Add a skill (e.g. Python)"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} id="add-skill-btn">
                <Plus size={16} style={{ marginRight: 4 }} />Add
              </button>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-ghost" id="profile-discard" onClick={() => showToast('Changes discarded', 'info')}>Discard</button>
          <button className="btn-save" id="profile-save" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </Layout>
  );
}
