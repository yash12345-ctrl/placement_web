// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ROLES = [
  { id: 'seeker', icon: '👤', title: 'Job Seeker', desc: 'Find & apply to jobs' },
  { id: 'recruiter', icon: '🏢', title: 'Recruiter', desc: 'Post & manage jobs' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('seeker');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const update = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return 'Full name is required.';
    if (!form.email.includes('@')) return 'Enter a valid email address.';
    if (form.password.length < 6) return 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) return 'Passwords do not match.';
    return '';
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    login({ name: form.name, email: form.email, role: role === 'seeker' ? 'Job Seeker' : 'Recruiter' });
    showToast(`Account created! Welcome, ${form.name.split(' ')[0]}! 🎉`, 'success');
    navigate('/dashboard');
  };

  const step1Valid = form.name.trim() && form.email.includes('@');

  return (
    <div className="auth-root">
      <div className="auth-container">
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            fontWeight: 800,
            color: '#fff',
            margin: '0 auto 16px',
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
          }}>P</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px', marginBottom: 8 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
            Join PlacementHub for free — it only takes 2 minutes
          </p>
        </div>

        {/* Glass card */}
        <div className="auth-glass-card">
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28, justifyContent: 'center' }}>
            {[1, 2].map(s => (
              <div
                key={s}
                style={{
                  width: s === 1 ? 60 : 100,
                  height: 4,
                  borderRadius: 4,
                  background: s <= step ? 'var(--primary)' : 'var(--border)',
                  transition: 'background 0.3s, width 0.3s',
                }}
              />
            ))}
          </div>

          <form onSubmit={handleRegister} noValidate>
            {error && (
              <div className="auth-error">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {step === 1 && (
              <>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12, textAlign: 'center' }}>
                  I am a…
                </p>
                <div className="role-selector">
                  {ROLES.map(r => (
                    <div
                      key={r.id}
                      className={`role-card ${role === r.id ? 'active' : ''}`}
                      onClick={() => setRole(r.id)}
                      id={`role-${r.id}`}
                    >
                      <div className="role-card-icon">{r.icon}</div>
                      <div className="role-card-title">{r.title}</div>
                      <div className="role-card-desc">{r.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="auth-form-group">
                  <label htmlFor="reg-name">Full name</label>
                  <div className="auth-input-wrap">
                    <User size={16} />
                    <input id="reg-name" type="text" placeholder="Alex Johnson"
                      value={form.name} onChange={update('name')} />
                  </div>
                </div>

                <div className="auth-form-group">
                  <label htmlFor="reg-email">Email address</label>
                  <div className="auth-input-wrap">
                    <Mail size={16} />
                    <input id="reg-email" type="email" placeholder="you@example.com"
                      value={form.email} onChange={update('email')} />
                  </div>
                </div>

                <div className="auth-form-group">
                  <label htmlFor="reg-phone">Phone (optional)</label>
                  <div className="auth-input-wrap">
                    <Phone size={16} />
                    <input id="reg-phone" type="tel" placeholder="+1 (555) 000-0000"
                      value={form.phone} onChange={update('phone')} />
                  </div>
                </div>

                <button
                  type="button"
                  className="btn-primary"
                  id="reg-next"
                  onClick={() => {
                    if (!step1Valid) {
                      setError('Please fill in name and a valid email.');
                    } else {
                      setError('');
                      setStep(2);
                    }
                  }}
                  disabled={!step1Valid}
                  style={{ opacity: step1Valid ? 1 : 0.5, marginTop: 8 }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    Continue
                    <ArrowRight size={16} />
                  </span>
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, padding: '12px 16px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                  <CheckCircle size={18} color="var(--success)" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{form.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{form.email}</div>
                  </div>
                </div>

                <div className="auth-form-group">
                  <label htmlFor="reg-password">Create password</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} />
                    <input id="reg-password" type={showPw ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={form.password} onChange={update('password')} />
                    <button type="button" className="eye-btn" onClick={() => setShowPw(p => !p)}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="auth-form-group">
                  <label htmlFor="reg-confirm">Confirm password</label>
                  <div className="auth-input-wrap">
                    <Lock size={16} />
                    <input id="reg-confirm" type={showPw ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={form.confirm} onChange={update('confirm')} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                  <button type="button" className="btn-ghost" style={{ flex: 1 }}
                    onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn-primary" id="reg-submit"
                    style={{ flex: 2, opacity: loading ? 0.8 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }} disabled={loading}>
                    {loading ? 'Creating account...' : 'Create Account'}
                    <Sparkles size={16} />
                  </button>
                </div>
              </>
            )}
          </form>

          <div className="auth-switch" style={{ marginTop: 20 }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Sign in</span>
          </div>
        </div>

        {/* Footer note */}
        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
          By continuing, you agree to our <span style={{ color: 'var(--primary)' }}>Terms of Service</span> and <span style={{ color: 'var(--primary)' }}>Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}