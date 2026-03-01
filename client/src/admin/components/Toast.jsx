import React from "react";
import { motion } from "framer-motion";
import "../styles/Toast.css";

const icons = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

export default function Toast({ message, type = "success" }) {
  return (
    <motion.div
      className={`toast toast-${type}`}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.25 }}
    >
      <span className="toast-icon">{icons[type] || icons.info}</span>
      <span className="toast-msg">{message}</span>
    </motion.div>
  );
}
