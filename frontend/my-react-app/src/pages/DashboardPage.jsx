// src/pages/DashboardPage.jsx
import { useState } from 'react';
import Layout from '../components/Layout';
import { Briefcase, Send, BookmarkCheck, TrendingUp, Clock, MapPin } from 'lucide-react';
import { JOBS, APPLICATIONS } from '../data/jobsData';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { icon: Briefcase, label: 'Jobs Available', value: '50,284', change: '+12%', dir: 'up', color: 'blue' },
  { icon: Send, label: 'Applications Sent', value: '5', change: '+2', dir: 'up', color: 'green' },
  { icon: BookmarkCheck, label: 'Saved Jobs', value: '12', change: '+4', dir: 'up', color: 'orange' },
  { icon: TrendingUp, label: 'Profile Views', value: '38', change: '+18%', dir: 'up', color: 'purple' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

  const recentJobs = JOBS.slice(0, 4);

  return (
    <Layout title="Dashboard" searchVal={search} onSearch={setSearch}>
      {/* Greeting banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f1624 0%, #1a2540 50%, #1a6ef5 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,110,245,0.3) 0%, transparent 70%)', top: -100, right: -50 }} />
        <div style={{ zIndex: 1 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>
            {greeting()},
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 8, letterSpacing: -0.5 }}>
            {firstName} 👋
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', maxWidth: 400 }}>
            You have <strong style={{ color: '#fff' }}>3 new job matches</strong> and{' '}
            <strong style={{ color: '#fff' }}>1 interview</strong> scheduled this week.
          </p>
        </div>
        <button
          className="btn-accent"
          style={{ zIndex: 1, whiteSpace: 'nowrap' }}
          onClick={() => navigate('/jobs')}
        >
          🔍 Browse Jobs
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {STATS.map(stat => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={stat.label}>
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={22} />
              </div>
              <div className="stat-info">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
              <div className={`stat-change ${stat.dir}`}>{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Jobs + Applications in 2-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recommended Jobs */}
        <div>
          <div className="section-header">
            <span className="section-title">Recommended for You</span>
            <button className="btn-outline btn-sm" onClick={() => navigate('/jobs')}>View all</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentJobs.map(job => (
              <div key={job.id} className="job-card" style={{ padding: 16 }} onClick={() => navigate('/jobs')}>
                <div className="job-card-top">
                  <div className="job-company-logo" style={{ background: job.logoColor, fontSize: 16, width: 40, height: 40 }}>
                    {job.logo}
                  </div>
                  <div className="job-card-info">
                    <div className="job-title" style={{ fontSize: 14 }}>{job.title}</div>
                    <div className="job-company">{job.company}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} />{job.posted}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--success)', fontWeight: 600, fontSize: 12 }}>{job.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div>
          <div className="section-header">
            <span className="section-title">My Applications</span>
            <button className="btn-outline btn-sm" onClick={() => navigate('/applications')}>View all</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {APPLICATIONS.slice(0, 4).map(app => (
              <div key={app.id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
              onClick={() => navigate('/applications')}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              >
                <div className="job-company-logo" style={{ background: app.logoColor, fontSize: 14, width: 36, height: 36, borderRadius: 8 }}>
                  {app.logo}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.job}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{app.company}</div>
                </div>
                <span className={`status-badge ${app.status}`}>{app.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
