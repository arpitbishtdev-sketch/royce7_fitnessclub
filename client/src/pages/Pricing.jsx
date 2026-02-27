import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/pricing.css";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    id: "FOUNDATION",
    price: "89",
    period: "/ month",
    tag: "Getting Started",
    desc: "Everything you need to begin your transformation journey with access to core facilities and group programs.",
    features: [
      "Full gym access (6AM–10PM)",
      "4 Group classes per month",
      "Online training app",
      "Nutrition guidelines",
      "Monthly check-in",
    ],
    missing: [
      "Personal coaching",
      "Nutrition consultation",
      "Body composition scan",
    ],
    cta: "START FOUNDATION",
    featured: false,
  },
  {
    id: "PERFORMANCE",
    price: "169",
    period: "/ month",
    tag: "Most Popular",
    desc: "The complete package for serious athletes. Unlimited access, personal coaching, and science-backed nutrition.",
    features: [
      "Full gym access (24/7)",
      "Unlimited group classes",
      "2x Personal training / month",
      "Custom nutrition plan",
      "Monthly body composition scan",
      "Recovery & mobility sessions",
      "Priority coach messaging",
    ],
    missing: [],
    cta: "START PERFORMANCE",
    featured: true,
  },
  {
    id: "ELITE",
    price: "299",
    period: "/ month",
    tag: "Maximum Results",
    desc: "White-glove coaching for athletes who demand the absolute best. Daily accountability, full-spectrum support.",
    features: [
      "Full gym access (24/7)",
      "Unlimited group classes",
      "4x Personal training / month",
      "Weekly nutrition consultations",
      "Bi-weekly body composition scans",
      "Recovery pods & cryotherapy",
      "24/7 coach access",
      "Custom supplement protocol",
    ],
    missing: [],
    cta: "START ELITE",
    featured: false,
  },
  {
    id: "TEAM",
    price: "Custom",
    period: "",
    tag: "For Teams & Orgs",
    desc: "Corporate wellness and team performance packages. Custom pricing for groups of 5 or more.",
    features: [
      "Dedicated team coach",
      "Group sessions & workshops",
      "Performance dashboards",
      "Custom nutrition programs",
      "Quarterly performance reviews",
    ],
    missing: [],
    cta: "GET CUSTOM QUOTE",
    featured: false,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "All plans are month-to-month with no lock-in contracts. Cancel anytime with 7 days notice.",
  },
  {
    q: "Is there a joining fee?",
    a: "No joining fees ever. We believe cost should never be a barrier to starting your fitness journey.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. You can switch plans at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "Do you offer a trial period?",
    a: "Yes — all plans include a 7-day free trial. No credit card required to get started.",
  },
];

export default function Pricing() {
  const heroRef = useRef(null);
  const plansRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: plansRef.current, start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pricing-faq", start: "top 82%" },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="pricing-page">
      {/* HERO */}
      <section className="pricing-hero" ref={heroRef}>
        <div className="pricing-hero__noise" />
        <div className="pricing-hero__grid" />

        <div className="pricing-hero__content">
          <motion.div
            className="pricing-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="dot--red" />
            MEMBERSHIP PLANS
          </motion.div>

          <div className="pricing-hero__headline-wrap">
            {["INVEST IN", "YOUR BEST", "SELF."].map((word, i) => (
              <motion.h1
                key={word}
                className={`pricing-hero__headline${i === 2 ? " outline" : ""}`}
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
            className="pricing-hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            No contracts. No joining fees. No excuses. Choose the plan that
            matches your ambition and start your 7-day free trial today.
          </motion.p>

          <motion.div
            className="pricing-hero__badges"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            {["7-Day Free Trial", "No Contracts", "Cancel Anytime"].map((b) => (
              <span key={b} className="pricing-hero__badge-pill">
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PLANS */}
      <section className="pricing-plans" ref={plansRef}>
        <div className="pricing-plans__grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card${plan.featured ? " pricing-card--featured" : ""}`}
            >
              {plan.featured && (
                <div className="pricing-card__ribbon">MOST POPULAR</div>
              )}

              <div className="pricing-card__top">
                <span className="pricing-card__tag">{plan.tag}</span>
                <h3 className="pricing-card__name">{plan.id}</h3>
              </div>

              <div className="pricing-card__price">
                {plan.price === "Custom" ? (
                  <span className="pricing-card__price-val pricing-card__price-custom">
                    CUSTOM
                  </span>
                ) : (
                  <>
                    <span className="pricing-card__price-symbol">$</span>
                    <span className="pricing-card__price-val">
                      {plan.price}
                    </span>
                    <span className="pricing-card__price-period">
                      {plan.period}
                    </span>
                  </>
                )}
              </div>

              <p className="pricing-card__desc">{plan.desc}</p>

              <div className="pricing-card__divider" />

              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="pricing-card__feature pricing-card__feature--yes"
                  >
                    <span className="feature-check">✓</span>
                    {f}
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li
                    key={f}
                    className="pricing-card__feature pricing-card__feature--no"
                  >
                    <span className="feature-check">✕</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-card__cta${plan.featured ? " pricing-card__cta--featured" : ""}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="pricing-plans__note">
          All prices in USD. Taxes may apply. 7-day free trial available on all
          plans.
        </p>
      </section>

      {/* COMPARISON NOTE */}
      <section className="pricing-guarantee">
        <motion.div
          className="pricing-guarantee__inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pricing-guarantee__icon">🏆</div>
          <h2 className="pricing-guarantee__title">RESULTS GUARANTEE</h2>
          <p className="pricing-guarantee__text">
            If you follow your program and nutrition plan for 90 days and don't
            see measurable results — we'll give you the next month free and
            rebuild your protocol from scratch. That's how confident we are.
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq">
        <div className="pricing-faq__inner">
          <div className="section-tag">COMMON QUESTIONS</div>
          <h2 className="section-title">FREQUENTLY ASKED</h2>
          <div className="pricing-faq__list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? " faq-item--open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="faq-item__question">
                  <span>{faq.q}</span>
                  <span className="faq-item__icon">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`faq-item__answer${openFaq === i ? " open" : ""}`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pricing-cta">
        <div className="pricing-cta__noise" />
        <motion.div
          className="pricing-cta__content"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="section-tag" style={{ textAlign: "center" }}>
            START TODAY
          </div>
          <h2 className="pricing-cta__title">YOUR FIRST 7 DAYS ARE FREE.</h2>
          <p className="pricing-cta__sub">
            No credit card. No commitment. Just results.
          </p>
          <div className="pricing-cta__btns">
            <button className="btn-primary btn-primary--light">
              CLAIM FREE TRIAL
            </button>
            <button className="btn-ghost btn-ghost--light">
              TALK TO A COACH
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
