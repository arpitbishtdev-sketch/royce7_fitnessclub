import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/contact.css";

gsap.registerPlugin(ScrollTrigger);

const CLOUD = import.meta.env.VITE_CLOUDINARY_NAME;

const img = (id, transforms = "q_auto,f_auto") =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${id}`;

const CONTACT_HERO_BG = img("CONTACT_u51iis", "q_auto,f_auto,w_1920");

const contactInfo = [
  {
    icon: "📍",
    label: "Location",
    value: "12 Forge Street, Athletic District",
    sub: "New York, NY 10001",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+1 (212) 555-0197",
    sub: "Mon–Sat, 6AM – 10PM",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "hello@royce7.com",
    sub: "Response within 24 hours",
  },
  {
    icon: "⏱",
    label: "Hours",
    value: "Mon–Fri: 5AM – 11PM",
    sub: "Sat–Sun: 6AM – 9PM",
  },
];

const socials = [
  { label: "INSTAGRAM", handle: "@royce7official" },
  { label: "TWITTER / X", handle: "@royce7gym" },
  { label: "YOUTUBE", handle: "ROYCE7 Performance" },
  { label: "TIKTOK", handle: "@royce7gym" },
];

export default function Contact() {
  const infoRef = useRef(null);
  const mapRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-info-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".social-row",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-socials", start: "top 82%" },
        },
      );

      gsap.fromTo(
        ".contact-map",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: mapRef.current, start: "top 72%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="contact-page">
      {/* ─────── HERO ─────── */}
      <section className="contact-hero">
        <div className="contact-hero__img-wrap">
          <img
            src={CONTACT_HERO_BG}
            alt="Contact Royce7"
            className="contact-hero__img"
          />
          <div className="contact-hero__overlay" />
        </div>
        <div className="contact-hero__noise" />
        <div className="contact-hero__grid" />
        <div className="contact-hero__accent" />

        <div className="contact-hero__content">
          <motion.div
            className="contact-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="dot--red" />
            GET IN TOUCH
          </motion.div>

          <div className="contact-hero__headline-wrap">
            {["LET'S", "START YOUR", "JOURNEY."].map((word, i) => (
              <motion.h1
                key={word}
                className={`contact-hero__headline${i === 2 ? " outline" : ""}`}
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
          </div>

          <motion.p
            className="contact-hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            Questions about membership, training programs, or just want to see
            the facility? Our team responds within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* ─────── FORM + SIDEBAR ─────── */}
      <section className="contact-body">
        {/* Form */}
        <div className="contact-form-wrap">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-tag">SEND A MESSAGE</div>
            <h2 className="contact-form-title">
              WE'D LOVE TO
              <br />
              HEAR FROM YOU
            </h2>

            {submitted && (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="contact-success__check">✓</span>
                Message sent. We'll be in touch within 24 hours.
              </motion.div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div
                  className={`contact-field${focused === "name" || form.name ? " contact-field--active" : ""}`}
                >
                  <label className="contact-field__label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    className="contact-field__input"
                    placeholder="Marcus Vale"
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    onChange={handleChange}
                    required
                  />
                  <span className="contact-field__line" />
                </div>

                <div
                  className={`contact-field${focused === "email" || form.email ? " contact-field--active" : ""}`}
                >
                  <label className="contact-field__label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    className="contact-field__input"
                    placeholder="you@email.com"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={handleChange}
                    required
                  />
                  <span className="contact-field__line" />
                </div>
              </div>

              <div
                className={`contact-field${focused === "subject" || form.subject ? " contact-field--active" : ""}`}
              >
                <label className="contact-field__label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  className="contact-field__input"
                  placeholder="Membership Enquiry"
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  onChange={handleChange}
                  required
                />
                <span className="contact-field__line" />
              </div>

              <div
                className={`contact-field contact-field--textarea${focused === "message" || form.message ? " contact-field--active" : ""}`}
              >
                <label className="contact-field__label">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  className="contact-field__input contact-field__textarea"
                  placeholder="Tell us how we can help..."
                  rows={6}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={handleChange}
                  required
                />
                <span className="contact-field__line" />
              </div>

              <button type="submit" className="contact-form__submit">
                SEND MESSAGE →
              </button>
            </form>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="contact-sidebar" ref={infoRef}>
          <div className="contact-info-grid">
            {contactInfo.map((item) => (
              <div key={item.label} className="contact-info-card">
                <span className="contact-info-card__icon">{item.icon}</span>
                <div>
                  <div className="contact-info-card__label">{item.label}</div>
                  <div className="contact-info-card__value">{item.value}</div>
                  <div className="contact-info-card__sub">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            <div className="contact-socials__title">FOLLOW THE JOURNEY</div>
            {socials.map((s) => (
              <div key={s.label} className="social-row">
                <span className="social-row__label">{s.label}</span>
                <span className="social-row__handle">{s.handle}</span>
                <span className="social-row__arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── MAP ─────── */}
      <div className="contact-map-wrap" ref={mapRef}>
        <div className="contact-map">
          <div className="contact-map__bg" />
          <div className="contact-map__grid" />
          <div className="contact-map__roads">
            <div className="contact-map__road contact-map__road--h1" />
            <div className="contact-map__road contact-map__road--h2" />
            <div className="contact-map__road contact-map__road--h3" />
            <div className="contact-map__road contact-map__road--v1" />
            <div className="contact-map__road contact-map__road--v2" />
            <div className="contact-map__road contact-map__road--v3" />
          </div>
          <div className="contact-map__overlay" />
          <div className="contact-map__pin">
            <motion.div
              className="contact-map__pin-dot"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="contact-map__pin-pulse" />
            <div className="contact-map__pin-card">
              <div className="contact-map__pin-name">ROYCE7 FITNESS</div>
              <div className="contact-map__pin-addr">
                12 Forge Street, Athletic District
              </div>
            </div>
          </div>
          <div className="contact-map__action">
            <button className="btn-primary">GET DIRECTIONS →</button>
          </div>
        </div>
      </div>

      {/* ─────── CTA ─────── */}
      <section className="contact-cta">
        <div className="contact-cta__noise" />
        <motion.div
          className="contact-cta__content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="contact-cta__title">READY TO START?</h2>
          <p className="contact-cta__sub">
            First 7 days free. No credit card required.
          </p>
          <div className="contact-cta__btns">
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
