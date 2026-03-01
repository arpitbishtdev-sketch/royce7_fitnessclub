import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { NavLink } from "react-router-dom";
import AuthModal from "./Authmodal";
import "../styles/navbar.css";

const siteName = import.meta.env.VITE_SITE_NAME || "ROYCE7";

const navLinks = [
  "Home",
  "Programs",
  "Trainers",
  "Nutrition",
  "Pricing",
  "Contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [memberCount] = useState(3847); // slightly dynamic feel
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min(y / docH, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <motion.div
        className="navbar__progress"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
      />

      <motion.nav
        ref={navRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Logo ── */}
        <NavLink to="/" className="navbar__logo">
          <div className="navbar__logo-emblem">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <polygon
                points="14,2 26,9 26,21 14,26 2,21 2,9"
                stroke="var(--red)"
                strokeWidth="1.5"
                fill="none"
                className="navbar__logo-hex"
              />
              <polygon
                points="14,6 22,11 22,19 14,22 6,19 6,11"
                fill="var(--red)"
                opacity="0.15"
              />
              <text
                x="14"
                y="18"
                textAnchor="middle"
                fontFamily="Bebas Neue, sans-serif"
                fontSize="9"
                fill="var(--red)"
                letterSpacing="0.5"
              >
                R7
              </text>
            </svg>
          </div>
          <div className="navbar__logo-wordmark">
            <span className="navbar__logo-text">{siteName}</span>
            <span className="navbar__logo-sub">Elite Fitness Club</span>
          </div>
        </NavLink>

        {/* ── Links ── */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="navbar__link"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {({ isActive }) => (
                  <>
                    <span className="navbar__link-text">{link}</span>
                    {isActive && (
                      <motion.span
                        className="navbar__link-dot"
                        layoutId="navDot"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    {hoveredLink === link && !isActive && (
                      <motion.span
                        className="navbar__link-hover-line"
                        layoutId="hoverLine"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Actions ── */}
        <div className="navbar__actions">
          {/* Live badge */}

          <div className="navbar__divider" />

          <button className="navbar__cta" onClick={() => setAuthOpen(true)}>
            <span className="navbar__cta-shimmer" />
            <span className="navbar__cta-text">Join Now</span>
          </button>

          {/* Burger */}
          <button
            className={`navbar__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.5 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            exit={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative number */}
            <span className="navbar__mobile-deco">MENU</span>

            <nav className="navbar__mobile-nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{
                    delay: i * 0.055 + 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NavLink
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="navbar__mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="navbar__mobile-num">0{i + 1}</span>
                    <span className="navbar__mobile-link-text">{link}</span>
                    <span className="navbar__mobile-arrow">→</span>
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="navbar__mobile-footer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <button
                className="navbar__mobile-cta"
                onClick={() => {
                  setAuthOpen(true);
                  setMenuOpen(false);
                }}
              >
                <span>Join Now</span>
                <span className="navbar__mobile-cta-sub">Free 7-Day Trial</span>
              </button>
              <p className="navbar__mobile-tagline">
                <span className="navbar__mobile-tagline-dot" />
                {memberCount.toLocaleString()}+ active members worldwide
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
