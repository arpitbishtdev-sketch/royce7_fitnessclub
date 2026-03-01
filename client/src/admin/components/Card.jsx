import React from "react";
import { motion } from "framer-motion";
import "../style/Card.css";

export default function Card({
  children,
  className = "",
  style = {},
  animate = true,
}) {
  if (animate) {
    return (
      <motion.div
        className={`card ${className}`}
        style={style}
        whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(201,168,76,0.12)" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}
