import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { CREDENTIALS } from '../data/jobsData';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
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
      setError('Invalid email or password. Try the demo account below.');
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(CREDENTIALS.email);
    setPassword(CREDENTIALS.password);
    setError('');
  };

  return (
    <main className="auth-root login-page">
      <div className="login-layout">
        <section className="login-intro" aria-labelledby="login-intro-title">
          <div className="login-brand" aria-label="PlacementHub">
            <span className="login-brand-mark" aria-hidden="true">
              <BriefcaseBusiness size={20} strokeWidth={2.2} />
            </span>
            <span>Placement<span className="login-brand-accent">Hub</span></span>
          </div>

          <div className="login-intro-copy">
            <p className="login-eyebrow">YOUR CAREER, IN MOTION</p>
            <h1 id="login-intro-title">
              Make your next
              <br />
              move <span>count.</span>
            </h1>
            <p className="login-intro-description">
              Find opportunities, save the roles that feel right, and keep track
              of every application—all in one place.
            </p>
          </div>

          <div className="login-workflow" aria-label="PlacementHub features">
            <span>Explore jobs</span>
            <i aria-hidden="true" />
            <span>Save roles</span>
            <i aria-hidden="true" />
            <span>Track applications</span>
          </div>
        </section>

        <section className="auth-glass-card login-card" aria-labelledby="login-title">
          <div className="login-card-heading">
            <p className="login-card-kicker">WELCOME BACK</p>
            <h2 id="login-title">Sign in to your account</h2>
            <p>Pick up where your job search left off.</p>
          </div>

          <form className="auth-form-card login-form" onSubmit={handleLogin} noValidate>
            {error && (
              <div className="auth-error login-error" role="alert">
                <AlertCircle size={17} aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            <div className="auth-form-group">
              <label htmlFor="login-email">Email address</label>
              <div className="auth-input-wrap login-input-wrap">
                <Mail size={17} aria-hidden="true" />
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
              <div className="auth-input-wrap login-input-wrap">
                <Lock size={17} aria-hidden="true" />
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
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary login-submit"
              id="login-submit"
              disabled={loading}
            >
              <span>{loading ? 'Signing in…' : 'Sign in'}</span>
              {!loading && <ArrowRight size={18} aria-hidden="true" />}
            </button>
          </form>

          <div className="login-demo">
            <div>
              <p className="login-demo-title">Just exploring?</p>
              <p className="login-demo-description">Use the demo account to take a look around.</p>
            </div>
            <button type="button" className="login-demo-action" onClick={fillDemoCredentials}>
              Use demo account
            </button>
          </div>

          <p className="auth-switch login-register">
            New to PlacementHub? <Link to="/register">Create an account</Link>
          </p>
        </section>
      </div>
    </main>
  );
}
