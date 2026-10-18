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
      <a href="tel:7404040813" className="sp-top-item">Need Help? <strong>Talk To An Expert: 7404040813 / 8708715777</strong></a>
      <div className="sp-top-item"><span className="sp-dot"></span> Monday – Saturday <strong>09:00 AM – 06:00 PM</strong></div>
      <a href="#contact" className="sp-top-item">Get In Touch <strong>With Us</strong> <span className="sp-arrow">↗</span></a>
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
            <a href="#services"><span>01</span> Visa Counselling</a>
            <a href="#services"><span>02</span> Offer Acceptance</a>
            <a href="#services"><span>03</span> Free Counselling</a>
            <a href="#services"><span>04</span> Application Submission</a>
            <a href="#services"><span>05</span> Course Selection</a>
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

      <button
        className="sp-enquiry"
        type="button"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer", border: "none" }}
      >
        <span>Free Consultation</span><b>↗</b>
      </button>

      <button className="sp-menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div className="sp-mobile-panel">
      <a href="/">Home</a>
      <details>
        <summary>Who We Are</summary>
        <a href="#about">About Us</a>
        <a href="#about">Mission & Vision</a>
        <a href="#about">Accreditation</a>
      </details>
      <details>
        <summary>Our Services</summary>
        <a href="#services">Visa Counselling</a>
        <a href="#services">Offer Acceptance</a>
        <a href="#services">Free Counselling</a>
        <a href="#services">Application Submission</a>
        <a href="#services">Course Selection</a>
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
      <a href="#success">Success Stories</a>
      <a href="#contact">Contact Us</a>
      <button
        className="sp-mobile-cta"
        type="button"
        onClick={() => setShowModal(true)}
        style={{ width: "100%", cursor: "pointer", border: "none" }}
      >
        Get Free Consultation ↗
      </button>
    </div>
  </header>

  <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
</div>
  );
}
