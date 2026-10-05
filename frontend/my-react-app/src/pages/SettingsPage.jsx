// src/pages/SettingsPage.jsx
import { useState } from 'react';
import Layout from '../components/Layout';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { showToast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [notifSettings, setNotifSettings] = useState({
    emailJobs: true,
    emailApps: true,
    emailInterview: true,
    pushAll: false,
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showSalary: false,
    openToWork: true,
  });

  const toggle = (setter, key) => setter(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => showToast('Settings saved!', 'success');

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      logout();
      navigate('/login');
      showToast('Account deleted.', 'info');
    }
  };

  const Toggle = ({ checked, onChange, id }) => (
    <button
      id={id}
      onClick={onChange}
      aria-checked={checked}
      role="switch"
      style={{
        width: 46, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
        background: checked ? 'var(--primary)' : '#d1d5db',
        position: 'relative', transition: 'background 0.3s', flexShrink: 0,
        boxShadow: checked ? '0 0 0 3px rgba(26,110,245,0.2)' : 'none',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: checked ? 23 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  const Section = ({ title, children }) => (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)', padding: '24px 28px', boxShadow: 'var(--shadow-sm)',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: 'var(--text-primary)' }}>{title}</h3>
      {children}
    </div>
  );

  const Row = ({ label, desc, id, checked, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: 14, borderBottom: '1px solid var(--border-light)' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>{desc}</div>}
      </div>
      <Toggle id={id} checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <Layout title="Settings">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your preferences and account settings</p>
        </div>
        <button className="btn-save" onClick={handleSave} id="save-settings">Save Changes</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Section title="🔔 Notification Preferences">
          <Row label="Job Recommendations" desc="Get emailed when new jobs match your profile" id="notif-email-jobs" checked={notifSettings.emailJobs} onChange={() => toggle(setNotifSettings, 'emailJobs')} />
          <Row label="Application Updates" desc="Status changes to your applications" id="notif-email-apps" checked={notifSettings.emailApps} onChange={() => toggle(setNotifSettings, 'emailApps')} />
          <Row label="Interview Alerts" desc="Reminders for upcoming interviews" id="notif-email-interview" checked={notifSettings.emailInterview} onChange={() => toggle(setNotifSettings, 'emailInterview')} />
          <Row label="Push Notifications" desc="Browser push notifications for all activity" id="notif-push-all" checked={notifSettings.pushAll} onChange={() => toggle(setNotifSettings, 'pushAll')} />
        </Section>

        <Section title="🔒 Privacy Settings">
          <Row label="Public Profile" desc="Let recruiters discover your profile" id="privacy-public" checked={privacy.profilePublic} onChange={() => toggle(setPrivacy, 'profilePublic')} />
          <Row label="Show Expected Salary" desc="Display your salary expectations on profile" id="privacy-salary" checked={privacy.showSalary} onChange={() => toggle(setPrivacy, 'showSalary')} />
          <Row label="Open to Work" desc="Signal to recruiters you're actively looking" id="privacy-open-to-work" checked={privacy.openToWork} onChange={() => toggle(setPrivacy, 'openToWork')} />
        </Section>

        <Section title="🗑️ Danger Zone">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--danger)' }}>Delete Account</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>Permanently remove your account and all data. This cannot be undone.</div>
            </div>
            <button
              id="delete-account-btn"
              onClick={handleDeleteAccount}
              style={{
                padding: '9px 20px', background: 'var(--danger)', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14,
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              Delete Account
            </button>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
