import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MacroCalculator from "../components/MacroCalculator";
import "../styles/nutrition.css";

gsap.registerPlugin(ScrollTrigger);

const CLOUD = import.meta.env.VITE_CLOUDINARY_NAME;

const img = (id, transforms = "q_auto,f_auto") =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${id}`;

const NUTR_HERO_BG = img("unnamed_zahoil", "q_auto,f_auto,w_1920");

const services = [
  {
    id: "01",
    icon: "🧬",
    title: "METABOLIC TESTING",
    tag: "Assessment",
    desc: "Resting metabolic rate and VO2 max testing to establish precise caloric targets and macronutrient ratios.",
  },
  {
    id: "02",
    icon: "📋",
    title: "CUSTOM MEAL PLANS",
    tag: "Planning",
    desc: "Periodized nutrition protocols that evolve alongside your training phase — bulking, cutting, or performance peaking.",
  },
  {
    id: "03",
    icon: "💊",
    title: "SUPPLEMENT PROTOCOL",
    tag: "Optimization",
    desc: "Evidence-based supplementation stacks personalized to your bloodwork, training load, and recovery demands.",
  },
  {
    id: "04",
    icon: "📊",
    title: "BODY COMPOSITION",
    tag: "Tracking",
    desc: "DEXA scan analysis and regular composition check-ins to ensure you're building muscle, not just losing weight.",
  },
];

const macros = [
  {
    label: "PROTEIN",
    grams: "180–220g",
    note: "Per day / 80kg athlete",
    color: "#e4301f",
    pct: 35,
  },
  {
    label: "CARBS",
    grams: "280–340g",
    note: "Training days",
    color: "#c9a84c",
    pct: 45,
  },
  {
    label: "FATS",
    grams: "65–85g",
    note: "Essential & dietary",
    color: "#777",
    pct: 20,
  },
];

const phases = [
  {
    num: "01",
    title: "FOUNDATION",
    tag: "Weeks 1–2",
    desc: "Baseline metabolic assessment, food preference mapping, and establishing a sustainable caloric baseline.",
  },
  {
    num: "02",
    title: "CALIBRATION",
    tag: "Weeks 3–4",
    desc: "Fine-tuning macros based on first-response data. Adjusting for energy, recovery, and performance markers.",
  },
  {
    num: "03",
    title: "PERIODIZATION",
    tag: "Ongoing",
    desc: "Cycling nutrition around your training block — loading, deloading, and peaking protocols in full sync.",
  },
  {
    num: "04",
    title: "MASTERY",
    tag: "Long-term",
    desc: "You understand your body. Autonomous nutrition decision-making with coach check-ins as needed.",
  },
];

export default function Nutrition() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const phasesRef = useRef(null);

  useEffect(() => {
    // FIX: Refresh ScrollTrigger after mount so position calculations are correct
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".nutr-service-card",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".phase-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: phasesRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".nutr-cta",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".nutr-cta",
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className="nutrition-page">
      {/* HERO */}
      <section className="nutr-hero" ref={heroRef}>
        <div className="nutr-hero__img-wrap" aria-hidden="true">
          <img src={NUTR_HERO_BG} alt="" className="nutr-hero__img" />
          <div className="nutr-hero__overlay" />
        </div>

        <div className="nutr-hero__noise" aria-hidden="true" />
        <div className="nutr-hero__grid" aria-hidden="true" />

        <div className="nutr-hero__content">
          <motion.div
            className="nutr-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="dot--gold" />
            NUTRITION SCIENCE
          </motion.div>

          <div className="nutr-hero__headline-wrap">
            <motion.h1
              className="nutr-hero__headline"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{
                delay: 0.5,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              FUEL THE
            </motion.h1>

            <motion.h1
              className="nutr-hero__headline outline"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{
                delay: 0.74,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              MACHINE
            </motion.h1>
          </div>

          <motion.p
            className="nutr-hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            Training earns 40%. Nutrition delivers the other 60%. Our precision
            nutrition protocols are built on metabolic science — not guesswork,
            not fads.
          </motion.p>

          <motion.div
            className="nutr-hero__ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <button className="btn-primary">START NUTRITION PLAN</button>
            <button className="btn-ghost">VIEW SERVICES</button>
          </motion.div>
        </div>

        {/* Floating data card */}
        <motion.div
          className="nutr-hero__datacard"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.2,
            duration: 0.8,
            type: "spring",
            stiffness: 180,
          }}
          aria-hidden="true"
        >
          <div className="nutr-hero__datacard-tag">SAMPLE MACRO SPLIT</div>
          {[
            { label: "Protein", val: "35%", color: "#e4301f" },
            { label: "Carbs", val: "45%", color: "#c9a84c" },
            { label: "Fats", val: "20%", color: "#777" },
          ].map((m) => (
            <div key={m.label} className="nutr-hero__datacard-row">
              <span
                className="nutr-hero__datacard-dot"
                style={{ background: m.color }}
              />
              <span className="nutr-hero__datacard-label">{m.label}</span>
              <span className="nutr-hero__datacard-val">{m.val}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* MACRO BREAKDOWN */}
      <MacroCalculator />

      {/* SERVICES */}
      <section className="nutr-services" ref={servicesRef}>
        <div className="section-header-inline">
          <div>
            <div className="section-tag">WHAT WE OFFER</div>
            <h2 className="section-title">NUTRITION SERVICES</h2>
          </div>
          <p className="section-desc">
            From first assessment to full autonomy — every step of your
            nutritional journey is guided by certified experts.
          </p>
        </div>

        <div className="nutr-services__grid">
          {services.map((s) => (
            <div key={s.id} className="nutr-service-card">
              <div className="nutr-service-card__header">
                <span className="nutr-service-card__id">{s.id}</span>
                <span className="nutr-service-card__tag">{s.tag}</span>
              </div>
              <div className="nutr-service-card__icon">{s.icon}</div>
              <h3 className="nutr-service-card__title">{s.title}</h3>
              <p className="nutr-service-card__desc">{s.desc}</p>
              <button className="nutr-service-card__btn">LEARN MORE →</button>
              <div className="nutr-service-card__line" />
            </div>
          ))}
        </div>
      </section>

      {/* PHASES */}
      <section className="nutr-phases" ref={phasesRef}>
        <div className="section-tag">THE JOURNEY</div>
        <h2 className="section-title">FOUR PHASES TO MASTERY</h2>
        <div className="nutr-phases__grid">
          {phases.map((p) => (
            <div key={p.num} className="phase-item">
              <div className="phase-item__connector" />
              <div className="phase-item__num">{p.num}</div>
              <span className="phase-item__tag">{p.tag}</span>
              <h3 className="phase-item__title">{p.title}</h3>
              <p className="phase-item__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="nutr-cta">
        <div className="nutr-cta__noise" aria-hidden="true" />
        <motion.div
          className="nutr-cta__content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-tag" style={{ textAlign: "center" }}>
            READY TO TRANSFORM
          </div>
          <h2 className="nutr-cta__title">YOUR DIET IS HOLDING YOU BACK.</h2>
          <p className="nutr-cta__sub">
            Book a free nutrition assessment. Our certified nutritionists will
            analyse your current diet and show you exactly where gains are being
            left on the table.
          </p>
          <div className="nutr-cta__btns">
            <button className="btn-primary">BOOK FREE ASSESSMENT</button>
            <button className="btn-ghost">VIEW PRICING</button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
