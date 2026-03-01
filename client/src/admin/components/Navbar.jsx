import React, { useState } from "react";
import "../style/Navbar.css";

export default function Navbar({ addToast }) {
  const [showProfile, setShowProfile] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="admin-navbar">
      <div className="navbar-search">
        <svg
          className="search-icon"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="navbar-actions">
        <button
          className="icon-btn"
          onClick={() => addToast("No new notifications", "info")}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M15 17H20L18.595 15.595A1 1 0 0118 14.83V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.83a1 1 0 01-.293.707L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="notif-dot" />
        </button>

        <div className="profile-wrap">
          <button
            className="profile-btn"
            onClick={() => setShowProfile((p) => !p)}
          >
            <div className="avatar">AD</div>
            <span className="profile-name">Admin</span>
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {showProfile && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <div className="avatar-lg">AD</div>
                <div>
                  <div className="dd-name">Admin User</div>
                  <div className="dd-email">admin@ironcore.fit</div>
                </div>
              </div>
              <hr className="dd-divider" />
              <button
                className="dd-item"
                onClick={() => {
                  setShowProfile(false);
                  addToast("Settings coming soon", "info");
                }}
              >
                Settings
              </button>
              <button
                className="dd-item"
                onClick={() => {
                  setShowProfile(false);
                  addToast("Profile coming soon", "info");
                }}
              >
                My Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
