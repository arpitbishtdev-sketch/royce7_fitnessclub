import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/trainers.css";

gsap.registerPlugin(ScrollTrigger);

const trainers = [
  {
    id: "01",
    name: "MARCUS VALE",
    role: "Head Strength Coach",
    spec: "Powerlifting / Athletic Performance",
    exp: "14 Years",
    certs: ["CSCS", "NSCA-CPT", "IPF Level 3"],
    bio: "Former national powerlifting champion with 14 years coaching elite athletes. Marcus has guided 400+ competitors to podium finishes across national and international stages.",
    stat1: { val: "400+", label: "Athletes Coached" },
    stat2: { val: "22", label: "National Titles" },
    hue: "10deg",
  },
  {
    id: "02",
    name: "KIRA SOLANO",
    role: "Combat & HIIT Lead",
    spec: "Muay Thai / Metabolic Conditioning",
    exp: "11 Years",
    certs: ["ACE-CPT", "Muay Thai Level 4", "FMS Certified"],
    bio: "Professional Muay Thai fighter turned elite conditioning coach. Kira brings fight-camp intensity to every session, fusing combat arts with cutting-edge metabolic science.",
    stat1: { val: "1200+", label: "Sessions Delivered" },
    stat2: { val: "98%", label: "Client Retention" },
    hue: "32deg",
  },
  {
    id: "03",
    name: "DARIAN CROSS",
    role: "Physique Specialist",
    spec: "Bodybuilding / Nutrition Science",
    exp: "9 Years",
    certs: ["ISSA Master Trainer", "Precision Nutrition L2", "NASM-PES"],
    bio: "IFBB Pro competitor and nutrition scientist. Darian architects physique transformations that dominate stage and real life — combining periodized training with precision nutrition.",
    stat1: { val: "300+", label: "Transformations" },
    stat2: { val: "8", label: "Pro Titles" },
    hue: "52deg",
  },
  {
    id: "04",
    name: "ELENA MARSH",
    role: "Mobility & Recovery Coach",
    spec: "Physical Therapy / Fascia Science",
    exp: "12 Years",
    certs: ["DPT", "FRC Mobility Specialist", "SFMA Certified"],
    bio: "Doctor of Physical Therapy and former professional dancer. Elena's recovery protocols keep athletes performing at their peak — eliminating pain, restoring function, extending careers.",
    stat1: { val: "500+", label: "Rehab Cases" },
    stat2: { val: "100%", label: "Return-to-Sport" },
    hue: "180deg",
  },
  {
    id: "05",
    name: "RAFAEL BURNS",
    role: "Athletic Performance Director",
    spec: "Sports Science / Speed & Agility",
    exp: "16 Years",
    certs: ["NSCA-CSCS", "USAW Level 2", "EXOS Performance"],
    bio: "Former NFL S&C coach with 16 years developing elite athletes across pro and amateur levels. Rafael's speed and power programs have placed athletes in every major professional league.",
    stat1: { val: "60+", label: "Pro Athletes" },
    stat2: { val: "16", label: "Years in Pro Sport" },
    hue: "220deg",
  },
  {
    id: "06",
    name: "JADE WINTERS",
    role: "Group Training Lead",
    spec: "Group Dynamics / Functional Training",
    exp: "8 Years",
    certs: ["ACE Group Fitness", "TRX Master Trainer", "CrossFit L3"],
    bio: "The heartbeat of our group training floor. Jade turns collective energy into individual breakthroughs — her sessions consistently rate as the most motivating in the facility.",
    stat1: { val: "5000+", label: "Group Sessions" },
    stat2: { val: "4.9★", label: "Avg. Rating" },
    hue: "280deg",
  },
];

export default function Trainers() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".trainer-card-full",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".trainer-cta",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".trainer-cta", start: "top 85%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="trainers-page">
      {/* HERO */}
      <section className="tr-hero" ref={heroRef}>
        <div className="tr-hero__noise" />
        <div className="tr-hero__grid" />
        <div className="tr-hero__accent-line" />

        <div className="tr-hero__content">
          <motion.div
            className="tr-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="dot--red" />
            THE COACHING STAFF
          </motion.div>

          <div className="tr-hero__headline-wrap">
            {["ELITE", "MINDS."].map((word, i) => (
              <motion.h1
                key={word}
                className="tr-hero__headline"
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.h1>
            ))}
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
              ELITE RESULTS.
            </motion.h1>
          </div>

          <motion.p
            className="tr-hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
          >
            Six world-class coaches. Every speciality. One collective mission —
            to transform ordinary athletes into extraordinary ones.
          </motion.p>
        </div>

        <motion.div
          className="tr-hero__roster-pill"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          <span className="dot--green" />6 Active Coaches
        </motion.div>
      </section>

      {/* TRAINER GRID */}
      <section className="tr-grid-section" ref={gridRef}>
        <div className="section-header-row">
          <div>
            <div className="section-tag">MEET THE TEAM</div>
            <h2 className="section-title">THE COACHES</h2>
          </div>
          <p className="section-desc">
            Hand-selected for expertise, performance history, and an unwavering
            commitment to client transformation.
          </p>
        </div>

        <div className="tr-cards-grid">
          {trainers.map((t) => (
            <div
              key={t.id}
              className={`trainer-card-full${active === t.id ? " is-active" : ""}`}
              onClick={() => setActive(active === t.id ? null : t.id)}
            >
              <div className="tcf__top">
                <div className="tcf__avatar" style={{ "--hue": t.hue }}>
                  <div className="tcf__avatar-inner" />
                  <span className="tcf__num">{t.id}</span>
                </div>
                <div className="tcf__meta">
                  <span className="tcf__exp">{t.exp} Experience</span>
                  <div className="tcf__certs">
                    {t.certs.slice(0, 2).map((c) => (
                      <span key={c} className="tcf__cert">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="tcf__name">{t.name}</h3>
              <div className="tcf__role">{t.role}</div>
              <div className="tcf__spec">{t.spec}</div>

              <div className={`tcf__expanded${active === t.id ? " open" : ""}`}>
                <p className="tcf__bio">{t.bio}</p>
                <div className="tcf__stats">
                  <div className="tcf__stat">
                    <span className="tcf__stat-val">{t.stat1.val}</span>
                    <span className="tcf__stat-label">{t.stat1.label}</span>
                  </div>
                  <div className="tcf__stat">
                    <span className="tcf__stat-val">{t.stat2.val}</span>
                    <span className="tcf__stat-label">{t.stat2.label}</span>
                  </div>
                </div>
              </div>

              <button className="tcf__toggle">
                {active === t.id ? "LESS INFO ↑" : "VIEW PROFILE →"}
              </button>

              <div className="tcf__line" />
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="tr-philosophy">
        <div className="tr-philosophy__inner">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-tag">COACHING PHILOSOPHY</div>
            <blockquote className="tr-philosophy__quote">
              "We don't just write programs. We build relationships. We
              understand the science, but we lead with humanity — because
              results live at the intersection of knowledge and trust."
            </blockquote>
            <cite className="tr-philosophy__cite">— ROYCE7 Coaching Staff</cite>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="trainer-cta">
        <div className="trainer-cta__noise" />
        <motion.div
          className="trainer-cta__content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-tag" style={{ textAlign: "center" }}>
            WORK WITH US
          </div>
          <h2 className="trainer-cta__title">FIND YOUR PERFECT COACH</h2>
          <p className="trainer-cta__sub">
            Book a free 30-minute consultation. We'll pair you with the coach
            who aligns with your goals, schedule, and training style.
          </p>
          <div className="trainer-cta__btns">
            <button className="btn-primary">BOOK CONSULTATION</button>
            <button className="btn-ghost">VIEW PROGRAMS</button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
