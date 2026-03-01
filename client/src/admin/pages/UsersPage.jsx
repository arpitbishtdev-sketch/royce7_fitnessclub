import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Card from "../components/Card";
import "../styles/UsersPage.css";

const MOCK_USERS = [
  {
    id: 1,
    name: "Rohan Sharma",
    email: "rohan@example.com",
    role: "user",
    status: "Active",
    joined: "2024-08-10",
  },
  {
    id: 2,
    name: "Priya Nair",
    email: "priya@example.com",
    role: "user",
    status: "Active",
    joined: "2024-09-05",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    email: "arjun@example.com",
    role: "admin",
    status: "Active",
    joined: "2024-06-01",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@example.com",
    role: "user",
    status: "Blocked",
    joined: "2024-10-12",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram@example.com",
    role: "user",
    status: "Active",
    joined: "2024-11-20",
  },
  {
    id: 6,
    name: "Kavya Reddy",
    email: "kavya@example.com",
    role: "user",
    status: "Active",
    joined: "2024-12-01",
  },
  {
    id: 7,
    name: "Aditya Kumar",
    email: "aditya@example.com",
    role: "admin",
    status: "Active",
    joined: "2024-07-15",
  },
];

export default function UsersPage({ addToast }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setUsers(MOCK_USERS);
      setLoading(false);
    }, 700);
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
    );
    addToast(`Role updated to ${newRole}`, "success");
  };

  const handleStatusToggle = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" }
          : u,
      ),
    );
    const user = users.find((u) => u.id === userId);
    addToast(
      `${user?.name} is now ${user?.status === "Active" ? "Blocked" : "Active"}`,
      "info",
    );
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    addToast(`${deleteTarget.name} deleted`, "success");
    setDeleteTarget(null);
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const columns = [
    {
      key: "name",
      label: "User",
      render: (val, row) => (
        <div className="user-cell">
          <div className="user-avatar">{val.charAt(0)}</div>
          <div>
            <div className="user-name">{val}</div>
            <div className="user-email">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (val, row) => (
        <select
          className="role-select"
          value={val}
          onChange={(e) => handleRoleChange(row.id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val, row) => (
        <button
          className={`status-toggle ${val === "Active" ? "active" : "blocked"}`}
          onClick={() => handleStatusToggle(row.id)}
        >
          <span className="status-dot" />
          {val}
        </button>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (v) => <span className="mono-text">{v}</span>,
    },
    {
      key: "actions",
      label: "",
      width: "60px",
      render: (_, row) => (
        <button className="delete-btn" onClick={() => setDeleteTarget(row)}>
          <svg
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      ),
    },
  ];

  return (
    <motion.div
      className="users-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-sub">Manage gym members and admins</p>
        </div>
      </div>

      <Card animate={false}>
        <div className="table-controls">
          <div className="search-wrap">
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="ctrl-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ctrl-input"
            />
          </div>
        </div>
        <Table columns={columns} data={filtered} loading={loading} />
      </Card>

      <Modal
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Permanently delete "${deleteTarget?.name}"? All their data will be removed.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Delete User"
        confirmVariant="danger"
      />
    </motion.div>
  );
}
