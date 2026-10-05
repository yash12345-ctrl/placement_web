// src/components/Topbar.jsx
import { useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ onMenuClick, searchVal, onSearch, title }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="topbar">
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-secondary)', marginRight: 8 }}
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      {title && (
        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', marginRight: 12, whiteSpace: 'nowrap' }}>
          {title}
        </span>
      )}

      <div className="topbar-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={searchVal || ''}
          onChange={e => onSearch?.(e.target.value)}
          aria-label="Global search"
        />
      </div>

      <div className="topbar-right">
        <button
          className="topbar-icon-btn"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="notif-dot" />
        </button>

        <div
          className="topbar-avatar"
          title={user?.name || 'User'}
          onClick={() => navigate('/profile')}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
