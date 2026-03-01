import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/Button";
import "../styles/Adminlogin.css";

export default function AdminLogin({}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (email === "admin@ironcore.fit" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      alert("Welcome back, Admin!");
      navigate("/admin", { replace: true });
    } else {
      alert("Invalid credentials. Try admin@ironcore.fit / admin123");
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg-overlay" />
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="login-brand">
          <span className="login-bolt">⚡</span>
          <h1>IRONCORE</h1>
          <p>Admin Portal</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ironcore.fit"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Authenticating..." : "Sign In to Admin"}
          </Button>
        </form>

        <p className="login-hint">Demo: admin@ironcore.fit / admin123</p>
      </motion.div>
    </div>
  );
}
