import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/Card";
import "../style/AdminDashboard.css";

const stats = [
  { label: "Total Users", value: "3,842", trend: "+12%", up: true, icon: "👥" },
  {
    label: "Active Memberships",
    value: "2,190",
    trend: "+8%",
    up: true,
    icon: "🏅",
  },
  {
    label: "Pending Payments",
    value: "47",
    trend: "+3",
    up: false,
    icon: "⏳",
  },
  {
    label: "Total Revenue",
    value: "₹8.4L",
    trend: "+21%",
    up: true,
    icon: "💰",
  },
];

const chartData = {
  Today: [
    { label: "1 Month", val: 4 },
    { label: "3 Month", val: 2 },
    { label: "6 Month", val: 1 },
    { label: "1 Year", val: 3 },
  ],
  "This Week": [
    { label: "1 Month", val: 18 },
    { label: "3 Month", val: 12 },
    { label: "6 Month", val: 9 },
    { label: "1 Year", val: 14 },
  ],
  "This Month": [
    { label: "1 Month", val: 72 },
    { label: "3 Month", val: 48 },
    { label: "6 Month", val: 35 },
    { label: "1 Year", val: 55 },
  ],
  "This Year": [
    { label: "1 Month", val: 820 },
    { label: "3 Month", val: 540 },
    { label: "6 Month", val: 310 },
    { label: "1 Year", val: 680 },
  ],
};

const tabs = ["Today", "This Week", "This Month", "This Year"];

function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.val));
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <motion.div
          key={d.label}
          className="bar-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="bar-label">{d.label}</div>
          <div className="bar-track">
            <motion.div
              className="bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(d.val / max) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
            />
          </div>
          <div className="bar-val">{d.val.toLocaleString()}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("This Month");

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">
            Welcome back — here's what's happening today.
          </p>
        </div>
        <div className="page-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
          >
            <Card className="stat-card">
              <div className="stat-top">
                <span className="stat-icon">{s.icon}</span>
                <span className={`stat-trend ${s.up ? "up" : "down"}`}>
                  {s.trend}
                </span>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-bar" />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-row-2">
        {/* Premium Membership Card */}
        <motion.div
          className="premium-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="premium-watermark">🏋️</div>
          <div className="premium-top">
            <div>
              <div className="premium-label">Premium Membership</div>
              <div className="premium-value">2,190</div>
              <div className="premium-sublabel">Total Active Members</div>
            </div>
          </div>
          <div className="premium-stats">
            <div className="premium-stat">
              <div className="ps-label">New This Month</div>
              <div className="ps-value">+143</div>
            </div>
            <div className="premium-divider" />
            <div className="premium-stat">
              <div className="ps-label">Monthly Revenue</div>
              <div className="ps-value">₹2.1L</div>
            </div>
            <div className="premium-divider" />
            <div className="premium-stat">
              <div className="ps-label">vs Last Month</div>
              <div className="ps-value up">+18%</div>
            </div>
          </div>
        </motion.div>

        {/* Analytics */}
        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <Card animate={false}>
            <div className="analytics-header">
              <div>
                <h2 className="section-title">Membership Analytics</h2>
                <p className="section-sub">Plans sold by duration</p>
              </div>
              <div className="tab-group">
                {tabs.map((t) => (
                  <button
                    key={t}
                    className={`tab-btn ${activeTab === t ? "active" : ""}`}
                    onClick={() => setActiveTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <BarChart data={chartData[activeTab]} />
              </motion.div>
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
