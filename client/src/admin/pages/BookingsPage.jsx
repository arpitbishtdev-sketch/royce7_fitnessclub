import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Card from "../components/Card";
import Button from "../components/Button";
import "../styles/BookingsPage.css";

const MOCK_BOOKINGS = [
  {
    id: 1,
    name: "Rohan Sharma",
    plan: "1 Year",
    amount: "₹12,000",
    status: "Paid",
    date: "2025-01-15",
  },
  {
    id: 2,
    name: "Priya Nair",
    plan: "3 Month",
    amount: "₹3,500",
    status: "Pending",
    date: "2025-01-18",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    plan: "6 Month",
    amount: "₹6,800",
    status: "Paid",
    date: "2025-01-20",
  },
  {
    id: 4,
    name: "Sneha Patel",
    plan: "1 Month",
    amount: "₹1,500",
    status: "Failed",
    date: "2025-01-21",
  },
  {
    id: 5,
    name: "Vikram Singh",
    plan: "1 Year",
    amount: "₹12,000",
    status: "Paid",
    date: "2025-01-22",
  },
  {
    id: 6,
    name: "Kavya Reddy",
    plan: "3 Month",
    amount: "₹3,500",
    status: "Pending",
    date: "2025-01-23",
  },
  {
    id: 7,
    name: "Aditya Kumar",
    plan: "6 Month",
    amount: "₹6,800",
    status: "Paid",
    date: "2025-01-24",
  },
  {
    id: 8,
    name: "Meera Joshi",
    plan: "1 Month",
    amount: "₹1,500",
    status: "Failed",
    date: "2025-01-25",
  },
];

function StatusBadge({ status }) {
  const map = {
    Paid: "badge-green",
    Pending: "badge-yellow",
    Failed: "badge-red",
  };
  return (
    <span className={`badge ${map[status] || "badge-gray"}`}>{status}</span>
  );
}

function ActionMenu({ booking, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="action-wrap">
      <button className="action-trigger" onClick={() => setOpen((p) => !p)}>
        ⋯
      </button>
      {open && (
        <div className="action-dropdown">
          <button
            className="action-item"
            onClick={() => {
              setOpen(false);
            }}
          >
            Edit
          </button>
          <button
            className="action-item danger"
            onClick={() => {
              setOpen(false);
              onDelete(booking);
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function BookingsPage({ addToast }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBookings(MOCK_BOOKINGS);
      setLoading(false);
    }, 800);
  }, []);

  const filtered = bookings.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "All" || b.plan === filterPlan;
    return matchSearch && matchPlan;
  });

  const handleDelete = (booking) => setDeleteTarget(booking);

  const confirmDelete = () => {
    setBookings((prev) => prev.filter((b) => b.id !== deleteTarget.id));
    addToast(`Booking for ${deleteTarget.name} deleted`, "success");
    setDeleteTarget(null);
  };

  const columns = [
    { key: "name", label: "Member Name" },
    {
      key: "plan",
      label: "Plan",
      render: (v) => <span className="plan-pill">{v}</span>,
    },
    { key: "amount", label: "Amount" },
    {
      key: "date",
      label: "Date",
      render: (v) => <span className="mono-text">{v}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      key: "actions",
      label: "",
      width: "60px",
      render: (_, row) => <ActionMenu booking={row} onDelete={handleDelete} />,
    },
  ];

  return (
    <motion.div
      className="bookings-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-sub">Manage all membership bookings</p>
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
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ctrl-input"
            />
          </div>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="ctrl-select"
          >
            <option>All</option>
            <option>1 Month</option>
            <option>3 Month</option>
            <option>6 Month</option>
            <option>1 Year</option>
          </select>
        </div>

        <Table columns={columns} data={filtered} loading={loading} />
      </Card>

      <Modal
        isOpen={!!deleteTarget}
        title="Delete Booking"
        message={`Are you sure you want to delete the booking for "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Delete Booking"
        confirmVariant="danger"
      />
    </motion.div>
  );
}
