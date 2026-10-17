"use client";

import React, { useState } from "react";
import ConsultationModal from "./ConsultationModal";

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

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
          <div className="ge-brand-text">
            <span className="ge-brand-title">Global <span>Expert</span></span>
            <span className="ge-brand-subtitle">Immigration Consultants</span>
          </div>
        </a>

        <div className="sp-contact" style={{ marginTop: "24px" }}>
          <a href="tel:08708715777">
            <span className="sp-icon">☎</span>
            <span>087087 15777</span>
          </a>
          <a href="mailto:info@globalexpertimmigration.com">
            <span className="sp-icon">✉</span>
            <span>info@globalexpertimmigration.com</span>
          </a>
          <a href="#contact">
            <span className="sp-icon">✦</span>
            <span>2nd floor, Sco-04, Railway Rd, Ibrahim Mandi, Karnal, Haryana 132001</span>
          </a>
        </div>
      </div>

      <div className="sp-col">
        <h3>Quick Links</h3>
        <div className="sp-links">
          <a href="https://solutionpointedu.com/free-counselling/">Free Counselling</a>
          <a href="https://solutionpointedu.com/visa-counselling/">Visa Counselling</a>
          <a href="https://solutionpointedu.com/course-selection/">Course Selection</a>
          <a href="https://solutionpointedu.com/application-submission/">Application Support</a>
          <a href="https://solutionpointedu.com/offer-aceptance/">Offer Acceptance</a>
          <a href="https://solutionpointedu.com/contact-us/">Enquiry / Registration</a>
        </div>
      </div>

      <div className="sp-col">
        <h3>Study Abroad</h3>
        <div className="sp-links">
          <a href="https://solutionpointedu.com/study-in-canada/">Study in Canada</a>
          <a href="https://solutionpointedu.com/study-in-australia/">Study in Australia</a>
          <a href="https://solutionpointedu.com/study-in-usa/">Study in USA</a>
          <a href="https://solutionpointedu.com/study-in-uk/">Study in UK</a>
          <a href="https://solutionpointedu.com/study-in-malta/">Study in Malta</a>
          <a href="https://solutionpointedu.com/study-in-europe/">Study in Europe</a>
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
        © 2026 <strong>Global Expert Immigration Consultants.</strong> All Rights Reserved.
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
