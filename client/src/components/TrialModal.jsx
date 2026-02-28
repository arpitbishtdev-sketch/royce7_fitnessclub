import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import "../styles/TrialModal.css";

/* ─── CONSTANTS ─────────────────────────────── */
const GOALS = [
  {
    id: "muscle",
    icon: "◈",
    title: "MUSCLE BUILDING",
    sub: "Hypertrophy & mass protocols",
  },
  {
    id: "fatloss",
    icon: "◉",
    title: "FAT LOSS",
    sub: "Precision cut & recomp",
  },
  {
    id: "strength",
    icon: "▲",
    title: "STRENGTH",
    sub: "Powerlifting & maximal output",
  },
  {
    id: "athlete",
    icon: "◆",
    title: "ATHLETE PERFORMANCE",
    sub: "Sport-specific conditioning",
  },
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const TRAINING_TIMES = ["Morning", "Evening"];

/* ─── SCROLL LOCK ─────────────────────────────── */
let scrollY = 0;
function lockScroll() {
  scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
}
function unlockScroll() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}

/* ─── PROGRESS BAR ─────────────────────────────── */
function ProgressBar({ step }) {
  return (
    <div className="tm-progress">
      {[1, 2, 3].map((n) => (
        <React.Fragment key={n}>
          <div
            className={`tm-progress__step ${step >= n ? "active" : ""} ${step > n ? "done" : ""}`}
          >
            <div className="tm-progress__dot">
              {step > n ? (
                <span className="tm-progress__check">✓</span>
              ) : (
                <span>{n}</span>
              )}
            </div>
            <span className="tm-progress__label">
              {n === 1 ? "GOAL" : n === 2 ? "DETAILS" : "CONFIRM"}
            </span>
          </div>
          {n < 3 && (
            <div className="tm-progress__line">
              <motion.div
                className="tm-progress__line-fill"
                initial={false}
                animate={{ scaleX: step > n ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── STEP 1 ─────────────────────────────── */
function Step1({ selected, onSelect }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".tm-goal-card");
    if (!cards) return;
    gsap.fromTo(
      cards,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        delay: 0.15,
      },
    );
  }, []);

  return (
    <div className="tm-step">
      <div className="tm-step__eyebrow">STEP 01</div>
      <h2 className="tm-step__title">SELECT YOUR GOAL</h2>
      <p className="tm-step__sub">
        Your program will be architected around this primary objective.
      </p>
      <div className="tm-goal-grid" ref={gridRef}>
        {GOALS.map((g) => (
          <button
            key={g.id}
            className={`tm-goal-card ${selected === g.id ? "tm-goal-card--selected" : ""}`}
            onClick={() => onSelect(g.id)}
          >
            <span className="tm-goal-card__icon">{g.icon}</span>
            <span className="tm-goal-card__title">{g.title}</span>
            <span className="tm-goal-card__sub">{g.sub}</span>
            <div className="tm-goal-card__corner tm-goal-card__corner--tl" />
            <div className="tm-goal-card__corner tm-goal-card__corner--br" />
            <div className="tm-goal-card__selected-line" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── STEP 2 ─────────────────────────────── */
function Step2({ data, onChange }) {
  const fieldsRef = useRef(null);

  useEffect(() => {
    const els = fieldsRef.current?.querySelectorAll(
      ".tm-field, .tm-toggle-group",
    );
    if (!els) return;
    gsap.fromTo(
      els,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, []);

  return (
    <div className="tm-step" ref={fieldsRef}>
      <div className="tm-step__eyebrow">STEP 02</div>
      <h2 className="tm-step__title">YOUR DETAILS</h2>
      <p className="tm-step__sub">
        This is used to assign the right coach and programme structure.
      </p>

      <div className="tm-fields" ref={fieldsRef}>
        <div className="tm-field">
          <label className="tm-field__label">FULL NAME</label>
          <input
            className="tm-field__input"
            type="text"
            placeholder="e.g. Alex Mercer"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="tm-field">
          <label className="tm-field__label">PHONE NUMBER</label>
          <input
            className="tm-field__input"
            type="tel"
            placeholder="e.g. +44 7700 900000"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="tm-toggle-group">
          <label className="tm-field__label">TRAINING EXPERIENCE</label>
          <div className="tm-toggles">
            {EXPERIENCE_LEVELS.map((lvl) => (
              <button
                key={lvl}
                className={`tm-toggle ${data.experience === lvl ? "tm-toggle--active" : ""}`}
                onClick={() => onChange("experience", lvl)}
              >
                {lvl.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="tm-toggle-group">
          <label className="tm-field__label">PREFERRED TRAINING TIME</label>
          <div className="tm-toggles">
            {TRAINING_TIMES.map((t) => (
              <button
                key={t}
                className={`tm-toggle ${data.trainingTime === t ? "tm-toggle--active" : ""}`}
                onClick={() => onChange("trainingTime", t)}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── STEP 3 ─────────────────────────────── */
function Step3({ goal, details }) {
  const goalObj = GOALS.find((g) => g.id === goal);
  const rowsRef = useRef(null);

  useEffect(() => {
    const rows = rowsRef.current?.querySelectorAll(".tm-summary-row");
    if (!rows) return;
    gsap.fromTo(
      rows,
      { x: -24, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.55,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, []);

  return (
    <div className="tm-step">
      <div className="tm-step__eyebrow">STEP 03</div>
      <h2 className="tm-step__title">CONFIRM YOUR PLAN</h2>
      <p className="tm-step__sub">
        Review your details before we assign your performance team.
      </p>

      <div className="tm-summary" ref={rowsRef}>
        <div className="tm-summary-row">
          <span className="tm-summary-row__key">TRAINING GOAL</span>
          <span
            className="tm-summary-row__val"
            style={{ color: "var(--tm-gold)" }}
          >
            {goalObj?.title ?? "—"}
          </span>
        </div>
        <div className="tm-summary-row">
          <span className="tm-summary-row__key">FULL NAME</span>
          <span className="tm-summary-row__val">{details.name || "—"}</span>
        </div>
        <div className="tm-summary-row">
          <span className="tm-summary-row__key">PHONE</span>
          <span className="tm-summary-row__val">{details.phone || "—"}</span>
        </div>
        <div className="tm-summary-row">
          <span className="tm-summary-row__key">EXPERIENCE</span>
          <span className="tm-summary-row__val">
            {details.experience || "—"}
          </span>
        </div>
        <div className="tm-summary-row">
          <span className="tm-summary-row__key">TRAINING TIME</span>
          <span className="tm-summary-row__val">
            {details.trainingTime || "—"}
          </span>
        </div>
      </div>

      <div className="tm-confirm-notice">
        <span className="tm-confirm-notice__dot" />
        Our team reviews every submission personally within 12 hours.
      </div>
    </div>
  );
}

/* ─── SUCCESS SCREEN ─────────────────────────────── */
function SuccessScreen() {
  return (
    <motion.div
      className="tm-success"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="tm-success__emblem">
        <motion.div
          className="tm-success__ring"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="tm-success__check"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.45,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
          }}
        >
          ✓
        </motion.div>
      </div>

      <motion.div
        className="tm-success__tag"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
      >
        TRIAL CONFIRMED
      </motion.div>

      <motion.h2
        className="tm-success__title"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.55 }}
      >
        YOU'RE IN.
      </motion.h2>

      <motion.p
        className="tm-success__body"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.55 }}
      >
        Our performance team will contact you within <strong>12 hours</strong>{" "}
        to build your personalised programme.
      </motion.p>

      <motion.div
        className="tm-success__divider"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.88, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.p
        className="tm-success__footnote"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        Check your messages. Elite performance starts now.
      </motion.p>
    </motion.div>
  );
}

/* ─── MAIN MODAL ─────────────────────────────── */
export default function TrialModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [goal, setGoal] = useState(null);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    experience: "",
    trainingTime: "",
  });

  const handleDetailChange = useCallback((key, val) => {
    setDetails((p) => ({ ...p, [key]: val }));
  }, []);

  const canAdvance = () => {
    if (step === 1) return !!goal;
    if (step === 2)
      return (
        details.name.trim() &&
        details.phone.trim() &&
        details.experience &&
        details.trainingTime
      );
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1);
    else setSuccess(true);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleClose = () => {
    onClose();
  };

  // Reset on reopen
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSuccess(false);
      setGoal(null);
      setDetails({ name: "", phone: "", experience: "", trainingTime: "" });
    }
  }, [isOpen]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => unlockScroll();
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="tm-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          {/* Noise layer */}
          <div className="tm-overlay__noise" />

          <motion.div
            className="tm-modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Grid bg */}
            <div className="tm-modal__grid" />

            {/* Close button */}
            <button
              className="tm-close"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <span className="tm-close__line tm-close__line--1" />
              <span className="tm-close__line tm-close__line--2" />
            </button>

            {/* Brand mark */}
            <div className="tm-brand">
              <span className="tm-brand__dot" />
              PERFORMANCE LAB
            </div>

            {!success ? (
              <>
                <ProgressBar step={step} />

                {/* Step content */}
                <div className="tm-step-viewport">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      variants={stepVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      {step === 1 && (
                        <Step1 selected={goal} onSelect={setGoal} />
                      )}
                      {step === 2 && (
                        <Step2 data={details} onChange={handleDetailChange} />
                      )}
                      {step === 3 && <Step3 goal={goal} details={details} />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer navigation */}
                <div className="tm-footer">
                  {step > 1 ? (
                    <button className="tm-btn-back" onClick={handleBack}>
                      ← BACK
                    </button>
                  ) : (
                    <div />
                  )}

                  <motion.button
                    className={`tm-btn-primary ${!canAdvance() ? "tm-btn-primary--disabled" : ""}`}
                    onClick={canAdvance() ? handleNext : undefined}
                    whileTap={canAdvance() ? { scale: 0.97 } : {}}
                    whileHover={canAdvance() ? { scale: 1.02 } : {}}
                  >
                    <span>
                      {step === 3 ? "CONFIRM FREE TRIAL" : "CONTINUE"}
                    </span>
                    <span className="tm-btn-primary__arrow">→</span>
                  </motion.button>
                </div>
              </>
            ) : (
              <SuccessScreen />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
