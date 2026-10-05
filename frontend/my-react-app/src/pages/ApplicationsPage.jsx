// src/pages/ApplicationsPage.jsx
import Layout from '../components/Layout';
import { APPLICATIONS } from '../data/jobsData';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';

const STATUS_ORDER = ['applied', 'review', 'interview', 'offered', 'rejected'];

export default function ApplicationsPage() {
  const [apps, setApps] = useState(APPLICATIONS);
  const { showToast } = useToast();

  const withdraw = (id, job) => {
    setApps(prev => prev.filter(a => a.id !== id));
    showToast(`Withdrew application for "${job}"`, 'info');
  };

  const counts = STATUS_ORDER.reduce((acc, s) => {
    acc[s] = apps.filter(a => a.status === s).length;
    return acc;
  }, {});

  return (
    <Layout title="My Applications">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">{apps.length} applications tracked</p>
        </div>
      </div>

      {/* Pipeline view */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {STATUS_ORDER.map(s => (
          <div key={s} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>{counts[s]}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'capitalize', marginTop: 4 }}>{s}</div>
            <span className={`status-badge ${s}`} style={{ marginTop: 8, display: 'inline-flex' }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Job Position</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state" style={{ padding: '40px 20px' }}>
                    <div className="empty-state-icon">📋</div>
                    <h3>No applications yet</h3>
                    <p>Start applying to jobs to track your progress here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              apps.map(app => (
                <tr key={app.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="job-company-logo" style={{ background: app.logoColor, fontSize: 13, width: 32, height: 32, borderRadius: 8 }}>
                        {app.logo}
                      </div>
                      <span style={{ fontWeight: 600 }}>{app.job}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{app.company}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{app.applied}</td>
                  <td><span className={`status-badge ${app.status}`}>{app.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn-outline btn-sm" id={`view-app-${app.id}`}>View</button>
                      <button
                        className="btn-sm"
                        id={`withdraw-app-${app.id}`}
                        style={{ padding: '7px 14px', border: '1.5px solid var(--danger)', color: 'var(--danger)', borderRadius: 20, background: 'transparent', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                        onClick={() => withdraw(app.id, app.job)}
                        onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        Withdraw
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
