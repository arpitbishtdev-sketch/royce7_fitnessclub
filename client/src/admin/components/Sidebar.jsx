import React from "react";
import "../style/Sidebar.css";

const icons = {
  dashboard: (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  bookings: (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
    </svg>
  ),
  users: (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M21 20c0-2.761-1.791-5-4-5" />
    </svg>
  ),
  logout: (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
      <path d="M9 20H5a2 2 0 01-2-2V6a2 2 0 012-2h4" />
    </svg>
  ),
};

const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "bookings", label: "Bookings" },
  { id: "users", label: "Users" },
];

export default function Sidebar({ activePage, setActivePage, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">⚡</span>
        <span className="brand-name">IRONCORE</span>
        <span className="brand-sub">ADMIN</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{icons[item.id]}</span>
            <span className="nav-label">{item.label}</span>
            {activePage === item.id && <span className="active-bar" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={onLogout}>
          <span className="nav-icon">{icons.logout}</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
