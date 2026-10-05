// src/components/Sidebar.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Send, BookmarkCheck,
  Bell, User, Settings, LogOut, Search, Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const NAV_ITEMS = [
  { label: 'Overview', section: 'MAIN' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Find Jobs', path: '/jobs' },
  { icon: Send, label: 'My Applications', path: '/applications', badge: '5' },
  { icon: BookmarkCheck, label: 'Saved Jobs', path: '/saved' },

  { label: 'ACCOUNT', section: 'ACCOUNT' },
  { icon: User, label: 'My Profile', path: '/profile' },
  { icon: Bell, label: 'Notifications', path: '/notifications', badge: '2' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { showToast } = useToast();

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">P</div>
        <span className="sidebar-logo-text">PlacementHub</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, idx) => {
          if (item.section) {
            return (
              <div key={idx} className="sidebar-section-label">{item.label}</div>
            );
          }
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNav(item.path)}
            >
              <span className="sidebar-item-icon">
                <Icon size={18} />
              </span>
              {item.label}
              {item.badge && (
                <span className="sidebar-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user" onClick={handleLogout} title="Click to logout">
          <div className="sidebar-user-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'Guest User'}</div>
            <div className="sidebar-user-role">Click to logout</div>
          </div>
          <LogOut size={16} color="rgba(255,255,255,0.4)" />
        </div>
      </div>
    </aside>
  );
}
