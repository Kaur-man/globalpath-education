"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import ConsultationModal from "./ConsultationModal";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
<footer id="sp-footer">
  <span className="sp-float one"></span>
  <span className="sp-float two"></span>

  <div className="sp-footer-wrap">
    <div className="sp-footer-grid">

      <div className="sp-brand">
        <a className="ge-brand-card" href="/" aria-label="Global Expert Immigration">
          <img
            src="/logo.png"
            alt="Global Expert Immigration"
            className="ge-brand-logo-img-footer"
          />
        </a>

        <div className="sp-footer-contact">
          <a href="tel:7404040813">
            <span className="sp-icon">☎</span>
            <span>7404040813 / 8708715777</span>
          </a>
          <a href="mailto:globalexpertvisa@gmail.com">
            <span className="sp-icon">✉</span>
            <span>globalexpertvisa@gmail.com</span>
          </a>
          <a href="#contact">
            <span className="sp-icon">✦</span>
            <span>SCO-04, Railway Rd, Karnal</span>
          </a>
        </div>
      </div>

      <div className="sp-col">
        <h3>Quick Links</h3>
        <div className="sp-links">
          <a href="#services">Free Counselling</a>
          <a href="#services">Visa Counselling</a>
          <a href="#services">Course Selection</a>
          <a href="#services">Application Support</a>
          <a href="#services">Offer Acceptance</a>
          <a href="#contact">Enquiry / Registration</a>
        </div>
      </div>

      <div className="sp-col">
        <h3>Study Abroad</h3>
        <div className="sp-links">
          <a href="#destinations">Study in Canada</a>
          <a href="#destinations">Study in Australia</a>
          <a href="#destinations">Study in USA</a>
          <a href="#destinations">Study in UK</a>
          <a href="#destinations">Study in Malta</a>
          <a href="#destinations">Study in Europe</a>
        </div>
      </div>

      <div>
        <div className="sp-cta">
          <h3>Start Your Journey</h3>
          <p>Get personalised guidance for your study abroad and visa plans.</p>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "30px",
              background: "#ffffff",
              color: "#035388",
              fontWeight: 800,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Get Free Consultation →
          </button>
        </div>

        <div className="sp-col" style={{ marginTop: "31px" }}>
          <h3>Explore</h3>
          <div className="sp-links">
            <a href="#about">About Global Expert Immigration</a>
            <a href="#success">Success Stories</a>
            <a href="/">Home</a>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div className="sp-bottom">
    <div className="sp-bottom-inner">
      <div className="sp-copy">
        © 2025 <strong>Global Expert Immigration Consultants.</strong> All Rights Reserved.
      </div>

      <div className="sp-social">
        <a href="https://www.facebook.com/" aria-label="Facebook">f</a>
        <a href="https://www.instagram.com/" aria-label="Instagram">ig</a>
        <a href="https://www.youtube.com/" aria-label="YouTube">yt</a>
        <a href="https://www.linkedin.com/" aria-label="LinkedIn">in</a>
        <a className="sp-top" href="#sp-footer" aria-label="Back to top">↑</a>
      </div>
    </div>
  </div>

  <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
</footer>
  );
}
