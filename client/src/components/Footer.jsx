import React from "react";
import { motion } from "framer-motion";
import "../styles/footer.css";

const siteName = import.meta.env.VITE_SITE_NAME || "ROYCE7";

const footerLinks = {
  Programs: [
    "Powerlifting",
    "HIIT Combat",
    "Body Sculpt",
    "Mobility RX",
    "Online Training",
  ],
  Company: ["About Us", "Our Story", "Careers", "Press", "Partners"],
  Support: ["Contact Us", "FAQs", "Membership", "Schedule", "Locations"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-mark">▲</span>
            <span className="footer__logo-name">{siteName}</span>
          </div>
          <p className="footer__tagline">
            Forge your legacy through discipline,
            <br />
            science, and relentless commitment.
          </p>
          <div className="footer__socials">
            {["IG", "TT", "YT", "FB"].map((s) => (
              <button key={s} className="footer__social-btn">
                {s}
              </button>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="footer__col">
            <h4 className="footer__col-title">{group}</h4>
            <ul className="footer__col-links">
              {links.map((link) => (
                <li key={link}>
                  <button className="footer__link">{link}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col footer__newsletter">
          <h4 className="footer__col-title">NEWSLETTER</h4>
          <p className="footer__newsletter-text">
            Weekly training insights, nutrition tips, and exclusive member
            offers.
          </p>
          <div className="footer__newsletter-form">
            <input
              type="email"
              placeholder="your@email.com"
              className="footer__newsletter-input"
            />
            <button className="footer__newsletter-btn">→</button>
          </div>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <div className="footer__bottom-left">
          <span className="footer__copy">
            © 2025 {siteName} Fitness Club. All rights reserved.
          </span>
        </div>
        <div className="footer__bottom-right">
          {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
            (item) => (
              <button key={item} className="footer__legal-link">
                {item}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="footer__bg-text">{siteName}</div>
    </footer>
  );
}
