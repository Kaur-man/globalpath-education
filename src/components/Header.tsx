"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import ConsultationModal from "./ConsultationModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
<div id="sp-premium-header" className="sp-header-wrap">
  <div className="sp-topbar">
    <div className="sp-topbar-inner">
      <div className="sp-top-col sp-top-left">
        <a href="tel:7404040813" className="sp-top-item">
          <span className="sp-top-label">Need Help? </span>
          <strong>Talk To An Expert: 7404040813 / 8708715777</strong>
        </a>
      </div>

      <div className="sp-top-col sp-top-center">
        <a href="mailto:globalexpertvisa@gmail.com" className="sp-top-email-item">
          <span className="sp-top-email-title">globalexpertvisa@gmail.com</span>
          <span className="sp-top-email-sub">With Us ↗</span>
        </a>
      </div>

      <div className="sp-top-col sp-top-right">
        <div className="sp-top-item">
          <span className="sp-dot"></span>
          <span>Monday – Saturday <strong>09:00 AM – 06:00 PM</strong></span>
        </div>
      </div>
    </div>
  </div>

  <header className="sp-main-header">
    <div className="sp-header-inner">

      <a className="sp-brand" href="/" aria-label="Global Expert Immigration">
        <div className="ge-brand-container">
          <img
            src="/logo.png"
            alt="Global Expert Immigration"
            className="ge-brand-logo-img"
          />
          <div className="ge-brand-text-block">
            <span className="ge-brand-company-title">GLOBAL EXPERT</span>
            <span className="ge-brand-company-subtitle">IMMIGRATION</span>
          </div>
        </div>
      </a>

      <nav className="sp-nav" aria-label="Main navigation">
        <a className="sp-nav-link active" href="/">Home</a>

        <div className="sp-nav-group">
          <button className="sp-nav-link sp-drop-btn" type="button">Who We Are <i></i></button>
          <div className="sp-dropdown">
            <a href="#about"><span>01</span> About Us</a>
            <a href="#about"><span>02</span> Mission & Vision</a>
            <a href="#accreditation"><span>03</span> Accreditation</a>
          </div>
        </div>

        <div className="sp-nav-group">
          <button className="sp-nav-link sp-drop-btn" type="button">Our Services <i></i></button>
          <div className="sp-dropdown">
            <a href="#destinations"><span>01</span> Visa Counselling</a>
            <a href="#destinations"><span>02</span> Offer Acceptance</a>
            <a href="#destinations"><span>03</span> Free Counselling</a>
            <a href="#destinations"><span>04</span> Application Submission</a>
            <a href="#destinations"><span>05</span> Course Selection</a>
          </div>
        </div>

        <div className="sp-nav-group">
          <button className="sp-nav-link sp-drop-btn" type="button">Study Abroad <i></i></button>
          <div className="sp-dropdown sp-country-menu">
            <a href="#destinations"><span>CA</span> Study in Canada</a>
            <a href="#destinations"><span>AU</span> Study in Australia</a>
            <a href="#destinations"><span>US</span> Study in USA</a>
            <a href="#destinations"><span>UK</span> Study in UK</a>
            <a href="#destinations"><span>MT</span> Study in Malta</a>
            <a href="#destinations"><span>EU</span> Study in Europe</a>
          </div>
        </div>

        <a className="sp-nav-link" href="#sp-success-stories">Success Stories</a>
        <a className="sp-nav-link" href="#why">Why Choose Us</a>
        <a className="sp-nav-link" href="#contact">Contact Us</a>
      </nav>

      <button className="sp-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" onClick={() => setMobileOpen(!mobileOpen)}>
        <span></span><span></span><span></span>
      </button>
    </div>

    <div className={`sp-mobile-panel ${mobileOpen ? "open" : ""}`} style={{ display: mobileOpen ? "flex" : "none" }}>
      <a href="/">Home</a>
      <details>
        <summary>Who We Are</summary>
        <a href="#about">About Us</a>
        <a href="#about">Mission & Vision</a>
        <a href="#accreditation">Accreditation</a>
      </details>
      <details>
        <summary>Our Services</summary>
        <a href="#destinations">Visa Counselling</a>
        <a href="#destinations">Offer Acceptance</a>
        <a href="#destinations">Free Counselling</a>
        <a href="#destinations">Application Submission</a>
        <a href="#destinations">Course Selection</a>
      </details>
      <details>
        <summary>Study Abroad</summary>
        <a href="#destinations">Canada</a>
        <a href="#destinations">Australia</a>
        <a href="#destinations">USA</a>
        <a href="#destinations">UK</a>
        <a href="#destinations">Malta</a>
        <a href="#destinations">Europe</a>
      </details>
      <a href="#sp-success-stories">Success Stories</a>
      <a href="#why">Why Choose Us</a>
      <a href="#contact">Contact Us</a>
    </div>
  </header>

  <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
</div>
  );
}
