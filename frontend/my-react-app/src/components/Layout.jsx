// src/components/Layout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children, title, searchVal, onSearch }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 99, display: 'none',
          }}
        />
      )}

      <Sidebar onClose={() => setSidebarOpen(false)} />

      <main className="main-content">
        <Topbar
          onMenuClick={() => setSidebarOpen(prev => !prev)}
          searchVal={searchVal}
          onSearch={onSearch}
          title={title}
        />
        <div className="page-body">
          {children}
        </div>
      </main>
    </div>
  );
}
