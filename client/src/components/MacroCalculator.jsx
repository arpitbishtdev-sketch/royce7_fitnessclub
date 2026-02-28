import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/MacroCalculator.css";

gsap.registerPlugin(ScrollTrigger);

const PROTEIN_MULTIPLIERS = {
  "Muscle Building": { min: 1.6, max: 2.2 },
  Strength: { min: 1.6, max: 2.0 },
  Calisthenics: { min: 1.4, max: 1.8 },
};

function calcResults({ gender, weight, bodyFat, goal }) {
  const bf = parseFloat(bodyFat);
  const w = parseFloat(weight);
  if (!w || !bf || isNaN(w) || isNaN(bf)) return null;

  const lbm = w * (1 - bf / 100);
  const { min, max } = PROTEIN_MULTIPLIERS[goal];
  const proteinMin = Math.round(lbm * min);
  const proteinMax = Math.round(lbm * max);

  // Mifflin-St Jeor BMR (uses total weight)
  const heightCm = 170; // default estimated
  const age = 28; // default estimated
  let bmr;
  if (gender === "Male") {
    bmr = 10 * w + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * w + 6.25 * heightCm - 5 * age - 161;
  }
  const tdee = Math.round(bmr * 1.55);

  return { lbm: lbm.toFixed(1), proteinMin, proteinMax, tdee };
}

export default function MacroCalculator() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({
    gender: "Male",
    weight: "",
    bodyFat: "",
    goal: "Muscle Building",
  });
  const [results, setResults] = useState(null);
  const [calculated, setCalculated] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setCalculated(false);
    setResults(null);
  };

  const handleCalculate = () => {
    const r = calcResults(form);
    setResults(r);
    setCalculated(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".calc-col",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.13,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".calc-header-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const proteinPct = results
    ? Math.min(100, Math.round((results.proteinMax / 300) * 100))
    : 0;
  const lbmPct = results
    ? Math.min(
        100,
        Math.round((parseFloat(results.lbm) / parseFloat(form.weight)) * 100),
      )
    : 0;
  const tdeePct = results
    ? Math.min(100, Math.round((results.tdee / 4000) * 100))
    : 0;

  return (
    <section className="macro-calc-section" ref={sectionRef}>
      <div className="macro-calc-section__bg-text">CALCULATE</div>

      <div className="macro-calc__header calc-col">
        <div className="section-tag">PRECISION NUTRITION TOOL</div>
        <h2 className="section-title">MACRO CALCULATOR</h2>
        <div className="calc-header-line" />
        <p className="section-desc">
          Built on lean body mass science — not generic formulas. Input your
          stats and receive a precision-calibrated protein target for your exact
          training goal.
        </p>
      </div>

      <div className="macro-calc__body">
        {/* INPUT PANEL */}
        <motion.div className="calc-panel calc-col" initial={false}>
          <div className="calc-panel__label">YOUR METRICS</div>

          <div className="calc-field">
            <label className="calc-field__label">GENDER</label>
            <div className="calc-select-wrap">
              <select
                name="gender"
                className="calc-select"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className="calc-select__arrow">▾</span>
            </div>
          </div>

          <div className="calc-field">
            <label className="calc-field__label">BODYWEIGHT (KG)</label>
            <div className="calc-input-wrap">
              <input
                type="number"
                name="weight"
                className="calc-input"
                placeholder="e.g. 82"
                value={form.weight}
                onChange={handleChange}
                min="30"
                max="250"
              />
              <span className="calc-input__unit">KG</span>
            </div>
          </div>

          <div className="calc-field">
            <label className="calc-field__label">BODY FAT %</label>
            <div className="calc-input-wrap">
              <input
                type="number"
                name="bodyFat"
                className="calc-input"
                placeholder="e.g. 15"
                value={form.bodyFat}
                onChange={handleChange}
                min="3"
                max="60"
              />
              <span className="calc-input__unit">%</span>
            </div>
          </div>

          <div className="calc-field">
            <label className="calc-field__label">TRAINING GOAL</label>
            <div className="calc-select-wrap">
              <select
                name="goal"
                className="calc-select"
                value={form.goal}
                onChange={handleChange}
              >
                <option value="Muscle Building">Muscle Building</option>
                <option value="Strength">Strength</option>
                <option value="Calisthenics">Calisthenics</option>
              </select>
              <span className="calc-select__arrow">▾</span>
            </div>
          </div>

          <motion.button
            className="calc-btn"
            onClick={handleCalculate}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
          >
            <span className="calc-btn__text">CALCULATE MACROS</span>
            <span className="calc-btn__arrow">→</span>
          </motion.button>
        </motion.div>

        {/* RESULTS PANEL */}
        <div className="calc-results calc-col">
          <div className="calc-panel__label">YOUR RESULTS</div>

          <AnimatePresence mode="wait">
            {!calculated ? (
              <motion.div
                key="placeholder"
                className="calc-results__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="calc-results__placeholder-icon">◎</div>
                <p>
                  Enter your stats and hit calculate to reveal your precision
                  macro targets.
                </p>
              </motion.div>
            ) : !results ? (
              <motion.div
                key="error"
                className="calc-results__placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="calc-results__placeholder-icon"
                  style={{ color: "var(--red)" }}
                >
                  ⚠
                </div>
                <p>Please enter valid weight and body fat values.</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Primary protein target */}
                <div className="calc-result-hero">
                  <div className="calc-result-hero__label">
                    DAILY PROTEIN TARGET
                  </div>
                  <div className="calc-result-hero__value">
                    <span className="calc-result-hero__num">
                      {results.proteinMin}
                    </span>
                    <span className="calc-result-hero__sep">—</span>
                    <span className="calc-result-hero__num">
                      {results.proteinMax}
                    </span>
                    <span className="calc-result-hero__unit">g</span>
                  </div>
                  <div className="calc-result-hero__goal">
                    {form.goal} Protocol
                  </div>
                </div>

                {/* Stat bars */}
                <div className="calc-stat-bars">
                  <ResultBar
                    label="LEAN BODY MASS"
                    value={`${results.lbm} kg`}
                    pct={lbmPct}
                    color="var(--gold)"
                    delay={0.1}
                  />
                  <ResultBar
                    label="PROTEIN RANGE MAX"
                    value={`${results.proteinMax}g / day`}
                    pct={proteinPct}
                    color="var(--red)"
                    delay={0.2}
                  />
                  <ResultBar
                    label="EST. DAILY CALORIES (TDEE)"
                    value={`${results.tdee} kcal`}
                    pct={tdeePct}
                    color="#aaa"
                    delay={0.3}
                  />
                </div>

                <div className="calc-result-note">
                  Based on Mifflin-St Jeor BMR × 1.55 activity factor. Protein
                  ranges use lean body mass multipliers for{" "}
                  {form.goal.toLowerCase()}.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ResultBar({ label, value, pct, color, delay }) {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.0,
        delay,
        ease: "power3.out",
        transformOrigin: "left",
      },
    );
  }, [pct, delay]);

  return (
    <motion.div
      className="calc-stat-bar"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="calc-stat-bar__header">
        <span className="calc-stat-bar__label">{label}</span>
        <span className="calc-stat-bar__value" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="calc-stat-bar__track">
        <div
          ref={barRef}
          className="calc-stat-bar__fill"
          style={{
            width: `${pct}%`,
            background: color,
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
}
