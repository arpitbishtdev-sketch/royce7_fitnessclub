import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/programs.css";

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: "01",
    title: "STRENGTH SYSTEM",
    tag: "POWER",
    desc: "Progressive overload protocols engineered for raw power and structural dominance.",
    stat: "12 WEEKS",
  },
  {
    id: "02",
    title: "HYPERTROPHY LAB",
    tag: "AESTHETICS",
    desc: "Precision muscle-building split focused on aesthetics, symmetry and density.",
    stat: "16 WEEKS",
  },
  {
    id: "03",
    title: "HIIT WARFARE",
    tag: "CONDITIONING",
    desc: "Metabolic conditioning and combat intervals designed to shred and condition.",
    stat: "8 WEEKS",
  },
  {
    id: "04",
    title: "ATHLETE PROTOCOL",
    tag: "PERFORMANCE",
    desc: "Speed, agility, explosiveness — performance training for competitive edge.",
    stat: "20 WEEKS",
  },
];

export default function Programs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".program-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".programs-cta__inner",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".programs-cta",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".section-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="programs">
      {/* HERO */}
      <section className="programs-hero">
        <div className="programs-hero__bg-text" aria-hidden="true">
          FORGE
        </div>
        <motion.div
          className="programs-hero__content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="programs-hero__eyebrow"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <span className="eyebrow-line" />
            TRAINING SYSTEMS
          </motion.div>
          <h1 className="programs-hero__title">
            BUILT FOR
            <br />
            <span>ELITE</span>
            <br />
            <motion.h1
              className="tr-hero__headline outline"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{
                delay: 0.74,
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              PERFORMANCE
            </motion.h1>
          </h1>
          <motion.p
            className="programs-hero__sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Every program is engineered with precision,
            <br />
            discipline and results in mind.
          </motion.p>
        </motion.div>

        <motion.div
          className="programs-hero__stats"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            ["4", "Programs"],
            ["10K+", "Athletes"],
            ["98%", "Completion"],
          ].map(([num, label]) => (
            <div className="hero-stat" key={label}>
              <span className="hero-stat__num">{num}</span>
              <span className="hero-stat__label">{label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROGRAM GRID */}
      <section className="programs-section" ref={sectionRef}>
        <div className="section-header">
          <div className="section-label">
            <span className="section-label__line" />
            OUR PROGRAMS
          </div>
        </div>
        <div className="programs-grid">
          {programs.map((prog, i) => (
            <div key={prog.id} className="program-card">
              <div className="program-card__top">
                <span className="program-card__id">{prog.id}</span>
                <span className="program-card__tag">{prog.tag}</span>
              </div>
              <div className="program-card__line" />
              <h3 className="program-card__title">{prog.title}</h3>
              <p className="program-card__desc">{prog.desc}</p>
              <div className="program-card__footer">
                <span className="program-card__stat">{prog.stat}</span>
                <button className="program-card__btn">
                  EXPLORE
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 7h12M7 1l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="program-card__hover-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="programs-cta">
        <div className="programs-cta__inner">
          <div className="programs-cta__label">
            <span className="section-label__line" />
            NEXT STEP
          </div>
          <h2 className="programs-cta__title">
            READY TO FORGE
            <br />
            <span>YOUR NEXT LEVEL?</span>
          </h2>
          <div className="programs-cta__actions">
            <button className="programs-cta__btn programs-cta__btn--primary">
              START FREE TRIAL
            </button>
            <button className="programs-cta__btn programs-cta__btn--ghost">
              VIEW ALL PROGRAMS
            </button>
          </div>
        </div>
        <div className="programs-cta__bg-num" aria-hidden="true">
          X
        </div>
      </section>
    </main>
  );
}
