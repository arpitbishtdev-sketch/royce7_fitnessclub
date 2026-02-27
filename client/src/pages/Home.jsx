import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/home.css";

gsap.registerPlugin(ScrollTrigger);

const CLOUD = import.meta.env.VITE_CLOUDINARY_NAME;
const img = (id, transforms = "q_auto,f_auto") =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${id}`;

const HERO_BG = img("home-1_tlxlhv", "q_auto,f_auto,w_1920");
const FEATURE_IMG = img("home-2_x1vgtj", "q_auto,f_auto,w_900");

const programs = [
  {
    id: "01",
    title: "POWERLIFTING",
    tag: "Strength",
    desc: "Build raw, foundational power with elite powerlifting protocols designed for every level.",
    icon: "🏋️",
  },
  {
    id: "02",
    title: "HIIT COMBAT",
    tag: "Cardio",
    desc: "Explosive interval training fused with combat drills. Burn fat, build endurance, dominate.",
    icon: "🥊",
  },
  {
    id: "03",
    title: "BODY SCULPT",
    tag: "Aesthetics",
    desc: "Precision hypertrophy programming for athletes who demand both power and visual impact.",
    icon: "⚡",
  },
  {
    id: "04",
    title: "MOBILITY RX",
    tag: "Recovery",
    desc: "Active recovery, fascia release, and joint longevity — the foundation of elite performance.",
    icon: "🔄",
  },
];

const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "3800+", label: "Members Transformed" },
  { value: "47", label: "Expert Coaches" },
  { value: "98%", label: "Retention Rate" },
];

const trainers = [
  {
    name: "MARCUS VALE",
    role: "Head Strength Coach",
    spec: "Powerlifting / Athletic Performance",
  },
  {
    name: "KIRA SOLANO",
    role: "Combat & HIIT Lead",
    spec: "Muay Thai / Metabolic Conditioning",
  },
  {
    name: "DARIAN CROSS",
    role: "Physique Specialist",
    spec: "Bodybuilding / Nutrition Science",
  },
];

/* ── Animated counter ── */
function CountUp({ target }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    const raw = parseFloat(target.replace(/[^0-9.]/g, ""));
    const hasPlus = target.includes("+");
    const hasPct = target.includes("%");
    const suffix = hasPlus ? "+" : hasPct ? "%" : "";

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: raw,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          const v = Math.floor(obj.val);
          ref.current.textContent =
            raw >= 1000 ? v.toLocaleString() + suffix : v + suffix;
        }
      },
    });

    return () => tween.kill(); // cleanup important
  }, [inView, target]);

  return <span ref={ref}>0</span>;
}

export default function Home() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const programsRef = useRef(null);

  useEffect(() => {
    /* Hero parallax on background image */
    gsap.to(".hero__img", {
      yPercent: 22,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    /* Infinite marquee — seamless, StrictMode-safe */
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let x = 0;
    let half = 0;
    let cancelled = false;

    const rafId = requestAnimationFrame(() => {
      if (cancelled) return;

      // Measure AFTER paint so scrollWidth is accurate
      half = marquee.scrollWidth / 2;

      const speed = half / (20 * 60); // pixels per frame @ 60fps = 20s per cycle

      const tick = () => {
        if (cancelled) return;
        x -= speed;
        // Wrap: when we've scrolled exactly one full copy, reset silently
        if (Math.abs(x) >= half) {
          x = 0;
        }
        gsap.set(marquee, { x });
      };

      gsap.ticker.add(tick);

      // Store tick reference for cleanup
      marquee._tickFn = tick;
    });

    /* Programs stagger */
    gsap.fromTo(
      ".program-card",
      { y: 70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.13,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: programsRef.current, start: "top 78%" },
      },
    );

    /* Stats */
    gsap.fromTo(
      ".stat-block",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".stats-section", start: "top 80%" },
      },
    );

    /* Feature image reveal */
    gsap.fromTo(
      ".feature-img-wrap",
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: ".feature-section", start: "top 72%" },
      },
    );

    /* Trainers */
    gsap.fromTo(
      ".trainer-card",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trainers-section", start: "top 78%" },
      },
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (marquee._tickFn) {
        gsap.ticker.remove(marquee._tickFn);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main className="home">
      {/* ─────────────── HERO ─────────────── */}
      <section className="hero" ref={heroRef}>
        {/* Real Cloudinary image as parallax layer */}
        <div className="hero__img-wrap">
          <img
            className="hero__img"
            src={HERO_BG}
            alt="ROYCE7 Fitness Club hero"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero__img-overlay" />
        </div>

        {/* Grain + grid atmosphere */}
        <div className="hero__noise" />
        <div className="hero__grid" />

        <div className="hero__content">
          <motion.div
            className="hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <span className="hero__eyebrow-dot" />
            EST. 2012 — ELITE FITNESS FACILITY
          </motion.div>

          <div className="hero__headline-wrap">
            {["FORGE", "YOUR", "LEGACY."].map((word, i) => (
              <motion.h1
                key={word}
                className={`hero__headline ${word === "LEGACY." ? "hero__headline--outline" : ""}`}
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{
                  delay: 0.55 + i * 0.13,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.h1>
            ))}
          </div>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
          >
            Where discipline meets science. Premium training programs,
            world-class
            <br />
            coaches, and a community built to push limits — and break them.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.6 }}
          >
            <button className="btn-primary">START FREE TRIAL</button>
            <button className="btn-ghost">
              <span className="btn-ghost__icon">▶</span>
              WATCH STORY
            </button>
          </motion.div>

          <motion.div
            className="hero__scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
          >
            <div className="hero__scroll-line" />
            <span>SCROLL</span>
          </motion.div>
        </div>

        {/* Floating badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 1.5,
            duration: 0.9,
            type: "spring",
            stiffness: 200,
          }}
        >
          <span className="hero__badge-num">7</span>
          <span className="hero__badge-label">TIME CHAMPION</span>
        </motion.div>

        {/* Live member pill */}
        <motion.div
          className="hero__pill"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <span className="hero__pill-dot" />
          <span>3,800+ active members</span>
        </motion.div>
      </section>

      {/* ─────────────── MARQUEE ─────────────── */}
      <div className="marquee-track">
        <div className="marquee-inner" ref={marqueeRef}>
          {[...Array(2)].map((_, di) =>
            [
              "STRENGTH",
              "ENDURANCE",
              "POWER",
              "DISCIPLINE",
              "LEGACY",
              "TRANSFORM",
              "ELITE",
              "ROYCE7",
            ].map((w, i) => (
              <span key={`${di}-${i}`} className="marquee-item">
                {w} <span className="marquee-sep">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ─────────────── PROGRAMS ─────────────── */}
      <section className="programs-section" ref={programsRef}>
        <div className="section-header">
          <div className="section-tag">TRAINING PROGRAMS</div>
          <h2 className="section-title">BUILD YOUR PROGRAM</h2>
          <p className="section-desc">
            Each program is engineered by certified specialists and tailored to
            specific performance goals.
          </p>
        </div>
        <div className="programs-grid">
          {programs.map((prog) => (
            <div key={prog.id} className="program-card">
              <div className="program-card__top">
                <span className="program-card__id">{prog.id}</span>
                <span className="program-card__tag">{prog.tag}</span>
              </div>
              <div className="program-card__icon">{prog.icon}</div>
              <h3 className="program-card__title">{prog.title}</h3>
              <p className="program-card__desc">{prog.desc}</p>
              <button className="program-card__btn">EXPLORE →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="stats-section">
        <div className="stats-bg-text">ROYCE7</div>
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-block">
              <div className="stat-value">
                <CountUp target={s.value} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── FEATURE SPLIT ─────────────── */}
      <section className="feature-section">
        {/* Real Cloudinary image — home-2 */}
        <div className="feature-img-wrap">
          <img
            className="feature-img"
            src={FEATURE_IMG}
            alt="ROYCE7 training facility"
            loading="lazy"
          />
          <div className="feature-img-overlay" />
          <div className="feature-img-tag">TRAINING FACILITY</div>
          <div className="feature-img-pill">
            <span>4.9★</span>&nbsp;Rated by members
          </div>
        </div>

        <div className="feature-copy">
          <div className="section-tag">WHY ROYCE7</div>
          <h2 className="section-title">
            NOT JUST A GYM.
            <br />
            AN ECOSYSTEM.
          </h2>
          <p className="section-desc">
            From precision programming to recovery science, every element of
            ROYCE7 is designed to accelerate your transformation. We don't just
            offer equipment — we offer a system built on proven methodology.
          </p>
          <ul className="feature-list">
            {[
              "Science-backed periodization protocols",
              "Private coaching & group sessions",
              "In-house nutrition consultation",
              "24/7 facility access for members",
              "Recovery pods & cryotherapy",
            ].map((item) => (
              <li key={item} className="feature-list__item">
                <span className="feature-list__check">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <button className="btn-primary">LEARN MORE</button>
        </div>
      </section>

      {/* ─────────────── TRAINERS ─────────────── */}
      <section className="trainers-section">
        <div className="section-header">
          <div className="section-tag">THE COACHING STAFF</div>
          <h2 className="section-title">ELITE MINDS. ELITE RESULTS.</h2>
        </div>
        <div className="trainers-grid">
          {trainers.map((t, i) => (
            <div key={t.name} className="trainer-card">
              <div className="trainer-card__avatar">
                <div
                  className="trainer-card__avatar-inner"
                  style={{ "--hue": `${10 + i * 22}deg` }}
                />
                <div className="trainer-card__num">0{i + 1}</div>
              </div>
              <div className="trainer-card__info">
                <h3 className="trainer-card__name">{t.name}</h3>
                <div className="trainer-card__role">{t.role}</div>
                <div className="trainer-card__spec">{t.spec}</div>
              </div>
              <button className="trainer-card__btn">VIEW PROFILE →</button>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── CTA BANNER ─────────────── */}
      <section className="cta-banner">
        <div className="cta-banner__noise" />
        <motion.div
          className="cta-banner__content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="cta-banner__title">READY TO REDEFINE YOUR LIMITS?</h2>
          <p className="cta-banner__sub">
            First 7 days free. No contracts. Just results.
          </p>
          <div className="cta-banner__btns">
            <button className="btn-primary btn-primary--light">
              CLAIM FREE TRIAL
            </button>
            <button className="btn-ghost btn-ghost--light">VIEW PRICING</button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
