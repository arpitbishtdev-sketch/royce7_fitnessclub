import React from "react";
import "../styles/Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  type = "button",
  style = {},
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
}
