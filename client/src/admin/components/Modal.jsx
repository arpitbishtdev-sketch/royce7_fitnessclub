import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import "../styles/Modal.css";

export default function Modal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  confirmVariant = "danger",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="modal-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant={confirmVariant} onClick={onConfirm}>
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
