import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Authmodal.css";

// ─── data ─────────────────────────────────────────────────────────────────────

const GOALS = [
  { id: "strength", icon: "💪", label: "Strength" },
  { id: "fat-loss", icon: "🔥", label: "Fat Loss" },
  { id: "endurance", icon: "⚡", label: "Endurance" },
  { id: "flexibility", icon: "🧘", label: "Flexibility" },
  { id: "muscle", icon: "🏋️", label: "Build Muscle" },
  { id: "wellness", icon: "🌿", label: "Wellness" },
];

const LEVELS = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "athlete", label: "Athlete" },
];

const STEP_LABELS = ["Account", "Goals", "Profile"];

// ─── animation variants ───────────────────────────────────────────────────────

const panelVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

// ─── Google SVG ───────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg className="auth-google__icon" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

// ─── step panels ──────────────────────────────────────────────────────────────

function StepAccount({ mode, setMode, data, setData }) {
  return (
    <div className="auth-panel">
      <div className="auth-toggle">
        <button
          className={`auth-toggle__btn ${mode === "login" ? "auth-toggle__btn--active" : ""}`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`auth-toggle__btn ${mode === "register" ? "auth-toggle__btn--active" : ""}`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <button
        className="auth-google"
        onClick={() => alert("Connect your Google OAuth provider here")}
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="auth-divider">or</div>

      {mode === "register" && (
        <div className="auth-field">
          <label className="auth-field__label">Full Name</label>
          <input
            className="auth-field__input"
            placeholder="John Doe"
            value={data.name || ""}
            onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
          />
        </div>
      )}

      <div className="auth-field">
        <label className="auth-field__label">Email</label>
        <input
          className="auth-field__input"
          type="email"
          placeholder="you@example.com"
          value={data.email || ""}
          onChange={(e) => setData((p) => ({ ...p, email: e.target.value }))}
        />
      </div>

      <div className="auth-field">
        <label className="auth-field__label">Password</label>
        <input
          className="auth-field__input"
          type="password"
          placeholder="••••••••"
          value={data.password || ""}
          onChange={(e) => setData((p) => ({ ...p, password: e.target.value }))}
        />
      </div>
    </div>
  );
}

function StepGoals({ data, setData }) {
  const toggle = (id) => {
    const cur = data.goals || [];
    setData((p) => ({
      ...p,
      goals: cur.includes(id) ? cur.filter((g) => g !== id) : [...cur, id],
    }));
  };

  return (
    <div className="auth-panel">
      <p className="auth-step-heading">What are your fitness goals?</p>
      <div className="auth-goals">
        {GOALS.map((g) => (
          <button
            key={g.id}
            className={`auth-goal ${(data.goals || []).includes(g.id) ? "auth-goal--selected" : ""}`}
            onClick={() => toggle(g.id)}
          >
            <span className="auth-goal__icon">{g.icon}</span>
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepProfile({ data, setData }) {
  return (
    <div className="auth-panel">
      <p className="auth-step-heading">Tell us about yourself</p>

      <div style={{ display: "flex", gap: "12px" }}>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="auth-field__label">Age</label>
          <input
            className="auth-field__input"
            type="number"
            placeholder="25"
            value={data.age || ""}
            onChange={(e) => setData((p) => ({ ...p, age: e.target.value }))}
          />
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="auth-field__label">Weight (kg)</label>
          <input
            className="auth-field__input"
            type="number"
            placeholder="75"
            value={data.weight || ""}
            onChange={(e) => setData((p) => ({ ...p, weight: e.target.value }))}
          />
        </div>
      </div>

      <div className="auth-field">
        <label className="auth-field__label">Experience Level</label>
        <div className="auth-toggle" style={{ marginTop: "4px" }}>
          {LEVELS.map((lv) => (
            <button
              key={lv.id}
              className={`auth-toggle__btn ${data.level === lv.id ? "auth-toggle__btn--active" : ""}`}
              onClick={() => setData((p) => ({ ...p, level: lv.id }))}
              style={{ padding: "10px 6px", fontSize: "11px" }}
            >
              {lv.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepSuccess({ mode }) {
  return (
    <div className="auth-success">
      <div className="auth-success__icon">🏆</div>
      <div className="auth-success__title">
        {mode === "login" ? "Welcome Back." : "You're In."}
      </div>
      <p className="auth-success__sub">
        {mode === "login"
          ? "Your session is ready. Time to get back to work."
          : "Your account is created. Free trial starts today — no card needed."}
      </p>
      <span className="auth-success__badge">
        {mode === "register"
          ? "🎯 7-Day Free Trial Activated"
          : "🔥 Session Started"}
      </span>
    </div>
  );
}

// ─── stepper bar ──────────────────────────────────────────────────────────────

function StepperBar({ current, total }) {
  return (
    <div className="auth-stepper">
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          <div
            className={`auth-step ${
              i === current
                ? "auth-step--active"
                : i < current
                  ? "auth-step--done"
                  : ""
            }`}
          >
            <span className="auth-step__num">
              {i < current ? "✓" : `0${i + 1}`}
            </span>
            <span className="auth-step__label">{STEP_LABELS[i]}</span>
          </div>
          {i < total - 1 && (
            <div className="auth-step__line">
              <div
                className="auth-step__line-fill"
                style={{ width: i < current ? "100%" : "0%" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── modal inner content ──────────────────────────────────────────────────────

function ModalContent({ onClose }) {
  const [mode, setMode] = useState("register");
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState({});
  const [done, setDone] = useState(false);

  const totalSteps = mode === "login" ? 1 : 3;

  const go = useCallback(
    (delta) => {
      const next = step + delta;
      if (next >= totalSteps) {
        setDone(true);
        return;
      }
      if (next < 0) return;
      setDir(delta);
      setStep(next);
    },
    [step, totalSteps],
  );

  const handleModeChange = (m) => {
    setMode(m);
    setStep(0);
    setData({});
    setDone(false);
  };

  const isLastStep = step === totalSteps - 1;

  return (
    <motion.div
      className="auth-modal"
      initial={{ y: 40, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 40, opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="auth-close" onClick={onClose}>
        ✕
      </button>

      {!done ? (
        <>
          <div className="auth-header">
            <p className="auth-header__eyebrow">Royce7 Fitness Club</p>
            <h2 className="auth-header__title">
              {mode === "login" ? (
                <>
                  Welcome <span>Back</span>
                </>
              ) : (
                <>
                  Join <span>Free</span>
                </>
              )}
            </h2>
          </div>

          {mode === "register" && <StepperBar current={step} total={3} />}

          <div className="auth-body">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`${mode}-${step}`}
                custom={dir}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && (
                  <StepAccount
                    mode={mode}
                    setMode={handleModeChange}
                    data={data}
                    setData={setData}
                  />
                )}
                {step === 1 && mode === "register" && (
                  <StepGoals data={data} setData={setData} />
                )}
                {step === 2 && mode === "register" && (
                  <StepProfile data={data} setData={setData} />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="auth-nav" style={{ marginTop: "20px" }}>
              {step > 0 ? (
                <button className="auth-back" onClick={() => go(-1)}>
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                className="auth-submit"
                style={{ flex: step > 0 ? "0 0 auto" : "1" }}
                onClick={() => go(1)}
              >
                {isLastStep
                  ? mode === "login"
                    ? "Log In →"
                    : "Complete →"
                  : "Continue →"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: "44px 48px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StepSuccess mode={mode} />
            <button
              className="auth-submit"
              style={{ marginTop: "24px" }}
              onClick={onClose}
            >
              Get Started →
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

// ─── MAIN EXPORT — accepts isOpen + onClose (matches your Navbar usage) ───────

export default function AuthModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="auth-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <ModalContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
