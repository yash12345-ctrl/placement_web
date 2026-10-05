// src/pages/NotificationsPage.jsx
import Layout from '../components/Layout';
import { NOTIFICATIONS } from '../data/jobsData';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const { showToast } = useToast();

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All notifications marked as read', 'success');
  };

  const dismiss = (id) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <Layout title="Notifications">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        <button
          className="btn-outline"
          onClick={markAllRead}
          id="mark-all-read"
          disabled={unreadCount === 0}
          style={{ opacity: unreadCount === 0 ? 0.5 : 1 }}
        >
          Mark all as read
        </button>
      </div>

      {notifs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <h3>All caught up!</h3>
          <p>You have no notifications right now. We'll alert you when something important happens.</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifs.map(n => (
            <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
              <div
                className="notif-icon"
                style={{ background: n.iconBg, color: n.iconColor, fontSize: 20 }}
              >
                {n.icon}
              </div>
              <div className="notif-text" style={{ flex: 1 }}>
                <h4>{n.title}</h4>
                <p>{n.message}</p>
                <div className="notif-time">{n.time}</div>
              </div>
              <button
                onClick={() => dismiss(n.id)}
                aria-label="Dismiss notification"
                id={`dismiss-notif-${n.id}`}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-muted)', fontSize: 18, lineHeight: 1,
                  padding: 4, borderRadius: 6, alignSelf: 'flex-start',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = '#fee2e2'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none'; }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
