import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar__logo">
          <span className="navbar__logo-mark">▲</span>
          <span className="navbar__logo-text">{siteName}</span>
          <span className="navbar__logo-sub">FITNESS CLUB</span>
        </div>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink
                to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="navbar__link"
              >
                {({ isActive }) => (
                  <>
                    {link}

                    {isActive && (
                      <motion.span
                        className="navbar__link-dot"
                        layoutId="navDot"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__cta">JOIN NOW</button>
          <button
            className={`navbar__burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <NavLink
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className="navbar__mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="navbar__mobile-num">0{i + 1}</span>
                  {link}
                </NavLink>
              </motion.div>
            ))}
            <motion.button
              className="navbar__mobile-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              JOIN NOW — FREE TRIAL
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
