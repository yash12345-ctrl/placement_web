// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CREDENTIALS } from '../data/jobsData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      login({ name: 'Alex Johnson', email, role: 'Job Seeker' });
      showToast('Welcome back, Alex! 👋', 'success');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Try admin@placementhub.com / admin123');
    }
    setLoading(false);
  };

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
            Welcome back
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
            Sign in to your PlacementHub account
          </p>
        </div>

        {/* Glass card */}
        <div className="auth-glass-card">
          <form className="auth-form-card" onSubmit={handleLogin} noValidate>
            {error && (
              <div className="auth-error">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap">
                <Mail size={16} />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <Lock size={16} />
                <input
                  id="login-password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPw(p => !p)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-remember-row">
              <label className="auth-remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  id="remember-me"
                />
                Remember me
              </label>
              <button type="button" className="auth-forgot">Forgot password?</button>
            </div>

            <button
              type="submit"
              className="btn-primary"
              id="login-submit"
              disabled={loading}
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">or</div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            fontSize: 13,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}>
            🔑 <strong>Demo credentials:</strong><br />
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>admin@placementhub.com</span>
            {' / '}
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>admin123</span>
          </div>

          <div className="auth-switch" style={{ marginTop: 20 }}>
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Create one free</span>
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