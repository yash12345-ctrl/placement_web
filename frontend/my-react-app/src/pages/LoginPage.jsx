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
      <div className="login-ornaments" aria-hidden="true">
        <div className="login-ornament login-ornament--rings">
          {[44, 68, 92, 116, 140, 164].map(size => (
            <span key={size} style={{ width: size, height: size }} />
          ))}
        </div>
        <div className="login-ornament login-ornament--stripes" />
        <div className="login-ornament login-ornament--dots" />
        <svg
          className="login-ornament login-ornament--chevrons"
          viewBox="0 0 76 220"
          fill="none"
        >
          {[12, 62, 112, 162].map(y => (
            <path
              key={y}
              d={`M8 ${y + 22} 38 ${y - 8} 68 ${y + 22} 59 ${y + 31} 38 ${y + 10} 17 ${y + 31} 8 ${y + 22}Z`}
            />
          ))}
        </svg>
      </div>
      <style>{`
        .login-page .login-brand {
          gap: 20px;
          font-size: 40px;
        }

        .login-page .login-brand-mark {
          width: 88px;
          height: 88px;
          border-radius: 22px;
        }

        .login-ornaments {
          position: absolute;
          z-index: 0;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .login-ornament {
          position: absolute;
          display: block;
          will-change: transform;
        }

        .login-ornament--rings {
          top: 12%;
          left: 2%;
          width: 170px;
          height: 170px;
          animation: login-rings-drift 15s ease-in-out infinite alternate;
        }

        .login-ornament--rings span {
          position: absolute;
          top: 50%;
          left: 0;
          border: 1.5px solid rgba(39, 99, 189, 0.27);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .login-ornament--stripes {
          top: 8%;
          right: 7%;
          width: clamp(130px, 17vw, 210px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: repeating-linear-gradient(
            45deg,
            rgba(133, 166, 103, 0.36) 0 6px,
            transparent 6px 14px
          );
          -webkit-mask-image: radial-gradient(circle, #000 69%, transparent 70%);
          mask-image: radial-gradient(circle, #000 69%, transparent 70%);
          animation: login-stripes-drift 19s ease-in-out infinite alternate;
        }

        .login-ornament--dots {
          bottom: 6%;
          left: 8%;
          width: 190px;
          height: 126px;
          background-image: radial-gradient(rgba(39, 61, 71, 0.46) 1.7px, transparent 1.8px);
          background-size: 23px 23px;
          animation: login-dots-drift 17s ease-in-out infinite alternate;
        }

        .login-ornament--chevrons {
          right: 4%;
          bottom: 12%;
          width: 68px;
          height: 200px;
          overflow: visible;
          stroke: rgba(39, 61, 71, 0.6);
          stroke-width: 1.5;
          animation: login-chevrons-drift 13s ease-in-out infinite alternate;
        }

        @keyframes login-rings-drift {
          from { transform: translate3d(0, -8px, 0) rotate(-4deg); }
          to { transform: translate3d(18px, 13px, 0) rotate(5deg); }
        }

        @keyframes login-stripes-drift {
          from { transform: translate3d(0, 8px, 0) rotate(-7deg); }
          to { transform: translate3d(-18px, -14px, 0) rotate(8deg); }
        }

        @keyframes login-dots-drift {
          from { transform: translate3d(-6px, 0, 0); }
          to { transform: translate3d(12px, -12px, 0); }
        }

        @keyframes login-chevrons-drift {
          from { transform: translate3d(0, 8px, 0); }
          to { transform: translate3d(-8px, -13px, 0); }
        }

        @media (max-width: 900px) {
          .login-ornament--rings {
            top: 7%;
            left: -25px;
          }

          .login-ornament--stripes {
            top: 28%;
            right: -45px;
            width: 135px;
          }

          .login-ornament--dots {
            bottom: 2%;
            left: 3%;
          }

          .login-ornament--chevrons {
            right: -8px;
            bottom: 3%;
          }
        }

        @media (max-width: 540px) {
          .login-page .login-brand {
            gap: 15px;
            font-size: 30px;
          }

          .login-page .login-brand-mark {
            width: 68px;
            height: 68px;
          }

          .login-ornament--rings {
            top: 2%;
            left: -52px;
          }

          .login-ornament--stripes {
            top: 18%;
            right: -70px;
            width: 120px;
          }

          .login-ornament--dots {
            bottom: 0;
            left: -28px;
          }

          .login-ornament--chevrons {
            right: -30px;
            bottom: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .login-ornament {
            animation: none !important;
            will-change: auto;
          }
        }
      `}</style>
      <div className="login-layout">
        <section className="login-intro" aria-labelledby="login-intro-title">
          <div className="login-brand" aria-label="PlacementHub">
            <span className="login-brand-mark" aria-hidden="true">
              <BriefcaseBusiness size={38} strokeWidth={2.2} />
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
