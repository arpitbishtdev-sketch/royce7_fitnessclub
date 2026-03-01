import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import BookingsPage from "./pages/BookingsPage";
import UsersPage from "./pages/UsersPage";
import "./styles/admin-global.css";
import "./styles/app.css";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <AdminDashboard />,
    bookings: <BookingsPage />,
    users: <UsersPage />,
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={() => {
          localStorage.removeItem("adminAuth");
          window.location.href = "/admin/login";
        }}
      />

      <div className="main-area">
        <Navbar />
        <div className="page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {pages[activePage]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
