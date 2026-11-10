"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";
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
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="sp-social-btn"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="sp-social-btn"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="sp-social-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a className="sp-top" href="#sp-footer" aria-label="Back to top" title="Back to top">
          <ArrowUp size={16} />
        </a>
      </div>
    </div>
  </div>

  <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
</footer>
  );
}
