"use client";

import React, { useEffect, useState } from "react";
import { Service, Destination, SuccessStory } from "../lib/types";
import ConsultationModal from "./ConsultationModal";

interface HomePageProps {
  initialServices?: Service[];
  initialDestinations?: Destination[];
  initialSuccessStories?: SuccessStory[];
}

export default function HomePage({
  initialServices = [],
  initialDestinations = [],
  initialSuccessStories = [],
}: HomePageProps) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const revealSelector =
      ".sp-section > .sp-wrap > .sp-center, .sp-about-visual, .sp-about-text, .sp-hero-visual, .sp-dest-card, .sp-objective-card, .sp-service, .sp-why-item, .sp-about-point, .sp-stat, .sp-accred-card, .sp-success-card, .sp-reveal, .sp-reveal-left, .sp-reveal-right, .sp-card-motion";

    const elements = document.querySelectorAll(revealSelector);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("sp-visible", "sp-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px",
        }
      );

      elements.forEach((el) => {
        // If element is already in viewport on initial page load, trigger immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(() => {
            el.classList.add("sp-visible", "sp-revealed");
          }, 80);
        } else {
          observer.observe(el);
        }
      });

      // Clean up on unmount
      return () => {
        observer.disconnect();
      };
    } else {
      elements.forEach((el) => el.classList.add("sp-visible", "sp-revealed"));
    }

    // Gallery carousel arrow buttons
    const track = document.getElementById("sp-gallery-track");
    const prevBtn = document.querySelector(".sp-gallery-prev");
    const nextBtn = document.querySelector(".sp-gallery-next");

    let scrollPos = 0;
    const cardWidth = 320;

    const handleNext = () => {
      if (track) {
        scrollPos = Math.min(scrollPos + cardWidth, track.scrollWidth - track.clientWidth);
        track.scrollTo({ left: scrollPos, behavior: "smooth" });
      }
    };

    const handlePrev = () => {
      if (track) {
        scrollPos = Math.max(scrollPos - cardWidth, 0);
        track.scrollTo({ left: scrollPos, behavior: "smooth" });
      }
    };

    nextBtn?.addEventListener("click", handleNext);
    prevBtn?.addEventListener("click", handlePrev);

    return () => {
      nextBtn?.removeEventListener("click", handleNext);
      prevBtn?.removeEventListener("click", handlePrev);
    };
  }, []);

  return (
    <div id="sp-master-home">
{/*  ================= HERO =================  */}
  <section className="sp-hero sp-section">
    <div className="sp-wrap">
      <div className="sp-hero-full">

        <div className="sp-hero-center-content">
          <h1 className="sp-hero-title sp-hero-title-inline">
            Your Journey. Your <em>Future.</em> Our Guidance.
          </h1>
          <p className="sp-hero-copy">
            Make your study abroad and visa journey simpler with experienced,
            personalised guidance from counselling and course selection to
            applications and the next step towards your international future.
          </p>

          <div className="sp-actions">
            <button
              className="sp-btn"
              type="button"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer", border: "none" }}
            >
              Start Your Journey →
            </button>
            <a className="sp-btn-light" href="#sp-success-stories">View Success Stories</a>
          </div>

          <div className="sp-trust-row">
            <div className="sp-trust"><b>2025</b><small>Established</small></div>
            <div className="sp-trust"><b>4.9★</b><small>Google Rating</small></div>
            <div className="sp-trust"><b>227+</b><small>Reviews</small></div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/*  ================= ABOUT =================  */}
  <section className="sp-about sp-section" id="about">
    <div className="sp-wrap">
      <div className="sp-about-grid">

        <div className="sp-about-visual">
          <div className="sp-about-year"><b>2025</b><span>Since</span></div>
          <div className="sp-about-main">
            <img decoding="async" src="https://globalexpertimmigration.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-09-at-11.45.44-AM-4.jpeg" alt="Global Expert Immigration team" />
          </div>
          <div className="sp-about-float">
            <b>Experience That Matters</b>
            <span>Personalised guidance designed around your profile, goals and international study plans.</span>
          </div>
        </div>

        <div className="sp-about-text">
          <div className="sp-eyebrow">About Global Expert Immigration</div>
          <h2 className="sp-heading">Guidance that turns <span>ambition</span> into a plan.</h2>
          <p>
            Global Expert Immigration Consultants is based in Karnal and has been
            helping students make informed decisions about studying abroad.
            Our approach is practical, personalised and focused on making every
            stage of the journey easier to understand.
          </p>

          <div className="sp-about-points">
            <a className="sp-about-point" href="https://globalexpertimmigration.com/about-us/">
              <b>01</b><h3>Personalised Guidance</h3>
              <p>Advice around your profile, goals and plans.</p>
            </a>
            <a className="sp-about-point" href="https://globalexpertimmigration.com/study-in-canada/">
              <b>02</b><h3>Global Study Options</h3>
              <p>Explore destinations, courses and opportunities.</p>
            </a>
            <a className="sp-about-point" href="https://globalexpertimmigration.com/contact-us/">
              <b>03</b><h3>End-to-End Support</h3>
              <p>Support from counselling to application stages.</p>
            </a>
          </div>

          <div className="sp-actions">
            <a className="sp-btn" href="https://globalexpertimmigration.com/about-us/">Discover Our Story</a>
            <a className="sp-btn-light" href="https://globalexpertimmigration.com/contact-us/">Talk To A Counsellor</a>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/*  ================= DESTINATIONS =================  */}
  <section className="sp-dest sp-section" id="destinations">
    <div className="sp-wrap">
      <div className="sp-center">
        <div className="sp-eyebrow">Study Abroad</div>
        <h2 className="sp-heading">Choose your <span>destination.</span></h2>
        <p className="sp-sub">Explore popular study destinations with guidance tailored to your course, profile and future goals.</p>
      </div>

      <div className="sp-dest-grid">
        {(initialDestinations.length > 0 ? initialDestinations : [
          { id: 1, country_name: 'Canada', image_url: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=80' },
          { id: 2, country_name: 'Australia', image_url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=900&q=80' },
          { id: 3, country_name: 'USA', image_url: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80' },
          { id: 4, country_name: 'United Kingdom', image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80' },
          { id: 5, country_name: 'Europe', image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80' },
        ]).map((d, idx) => (
          <a key={d.id || idx} className="sp-dest-card" href="#destinations">
            <img decoding="async" src={d.image_url || 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=80'} alt={d.country_name} />
            <div className="sp-dest-info"><small>Study Abroad</small><b>{d.country_name}</b><span>Explore →</span></div>
          </a>
        ))}
      </div>
      <div className="sp-dest-note">Destination pages can be expanded as new country-specific programs are added.</div>
    </div>
  </section>

  {/*  ================= OBJECTIVE =================  */}
  <section className="sp-objective sp-section">
    <div className="sp-wrap">
      <div className="sp-center">
        <div className="sp-eyebrow">Your Objective</div>
        <h2 className="sp-heading">Where do you want to <span>go?</span></h2>
        <p className="sp-sub">Tell us what you want to achieve and we’ll help you understand the right next step.</p>
      </div>

      <div className="sp-objective-grid">
        <div className="sp-objective-card"><div className="sp-objective-no">01</div><h3>Study Abroad</h3><p>Find the right course and destination for your academic goals.</p><a href="https://globalexpertimmigration.com/free-counselling/">Get Guidance →</a></div>
        <div className="sp-objective-card"><div className="sp-objective-no">02</div><h3>Visa Guidance</h3><p>Understand the visa process and prepare your application with clarity.</p><a href="https://globalexpertimmigration.com/visa-counselling/">Get Guidance →</a></div>
        <div className="sp-objective-card"><div className="sp-objective-no">03</div><h3>Course Selection</h3><p>Choose a course that fits your interests and future direction.</p><a href="https://globalexpertimmigration.com/course-selection/">Explore →</a></div>
        <div className="sp-objective-card"><div className="sp-objective-no">04</div><h3>Application Support</h3><p>Move through application submission with organised professional support.</p><a href="https://globalexpertimmigration.com/application-submission/">Learn More →</a></div>
        <div className="sp-objective-card"><div className="sp-objective-no">05</div><h3>Offer Acceptance</h3><p>Get support in understanding and progressing with your offer.</p><a href="https://globalexpertimmigration.com/offer-aceptance/">Learn More →</a></div>
        <div className="sp-objective-card"><div className="sp-objective-no">06</div><h3>Not Sure Yet?</h3><p>Start with a conversation and get a clearer path based on your profile.</p><a href="https://globalexpertimmigration.com/contact-us/">Talk To Us →</a></div>
      </div>
    </div>
  </section>

  {/*  ================= SUCCESS STORIES =================  */}
  <section className="sp-success sp-section" id="sp-success-stories">
    <div className="sp-wrap">

      <div className="sp-center sp-reveal">
        <div className="sp-eyebrow">Success Stories</div>
        <h2 className="sp-heading">Dreams that became <span>real milestones.</span></h2>
        <p className="sp-sub">
          A glimpse of recent Global Expert Immigration visa and study-abroad success stories.
          Every card opens the original success-story page.
        </p>
      </div>

      <div className="sp-success-gallery sp-reveal">
        <button className="sp-gallery-arrow sp-gallery-prev" type="button" aria-label="Previous success story">‹</button>

        <div className="sp-gallery-window">
          <div className="sp-gallery-track" id="sp-gallery-track">
            {(initialSuccessStories.length > 0 ? initialSuccessStories : [
              { id: 1, title: 'Visa Success', category: 'Success Story', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.35-AM.jpeg' },
              { id: 2, title: 'Student Visa', category: 'Singapore', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.36-AM.jpeg' },
              { id: 3, title: 'Study Visa', category: 'United Kingdom', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.36-AM-1.jpeg' },
              { id: 4, title: 'Study Visa', category: 'Cyprus', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.37-AM.jpeg' },
              { id: 5, title: 'Study Visa', category: 'Russia', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.38-AM.jpeg' },
              { id: 6, title: 'Tourist Visa', category: 'Singapore', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.39-AM.jpeg' },
              { id: 7, title: 'Visa Approved', category: 'Client Success', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-19-at-11.06.40-AM.jpeg' },
              { id: 8, title: 'Successful Journey', category: 'Global Expert', image_url: 'https://globalexpertimmigration.com/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-14-at-5.14.16-PM-scaled.jpeg' },
            ]).map((story, sIdx) => (
              <a key={story.id || sIdx} className="sp-success-card" href="#success">
                <div className="sp-success-img">
                  <img decoding="async" src={story.image_url} alt={story.title} />
                </div>
                <div className="sp-success-card-info">
                  <span>{story.category}</span>
                  <b>{story.title}</b>
                  <i>View Story →</i>
                </div>
              </a>
            ))}
          </div>
        </div>

        <button className="sp-gallery-arrow sp-gallery-next" type="button" aria-label="Next success story">›</button>
      </div>

      <div className="sp-gallery-bottom sp-reveal">
        <div className="sp-gallery-dots" id="sp-gallery-dots"></div>
        <a className="sp-btn" href="https://globalexpertimmigration.com/success-stories/">Explore All Success Stories →</a>
      </div>

      <div className="sp-review-shell sp-reveal">
        <div className="sp-review-feature">
          <div>
            <div className="sp-stars">★★★★★</div>
            <div className="sp-review-quote" id="sp-review-text">“Trusted guidance, clear communication and support throughout the journey.”</div>
          </div>
          <div>
            <div className="sp-review-name" id="sp-review-name">Global Expert Immigration Clients</div>
            <div className="sp-review-note">Google rating • 4.9 / 5 • 227+ reviews</div>
          </div>
        </div>

        <div className="sp-proof-grid">
          <div className="sp-proof"><b>5.0★</b><span>Google Rating</span></div>
          <div className="sp-proof"><b>227+</b><span>Google Reviews</span></div>
          <div className="sp-proof"><b>2025</b><span>Established</span></div>
          <div className="sp-proof"><b>6+</b><span>Study Destinations</span></div>
        </div>
      </div>

      <div className="sp-actions sp-reveal" style={{ justifyContent: "center" }}>
        <a className="sp-btn" href="https://globalexpertimmigration.com/success-stories/">Explore Success Stories</a>
        <a className="sp-btn-light" href="https://www.google.com/search?q=global+expert+immigration+karnal&oq=g&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIGCAAQRRg8MgYIARBFGDsyBggCEEUYOTIICAMQRRgnGDsyBggEEEUYPDIGCAUQRRg8MgYIBhBFGD0yBggHEEUYPNIBCDM0ODNqMGo0qAIAsAIB&sourceid=chrome&source=chrome.ob&ie=UTF-8">Read Google Reviews</a>
      </div>
    </div>
  </section>

  {/*  ================= WHY CHOOSE =================  */}
  <section className="sp-why sp-section" id="why">
    <div className="sp-wrap">
      <div className="sp-center">
        <div className="sp-eyebrow">Why Global Expert Immigration</div>
        <h2 className="sp-heading">Why choose <span>us?</span></h2>
        <p className="sp-sub">Because the right guidance can make a complicated international education journey feel much clearer.</p>
      </div>

      <div className="sp-why-layout">
        <div className="sp-why-visual">
          <div className="sp-why-ring"></div>
          <div className="sp-why-center"><b>SP</b><span>Education & Immigration Guidance</span></div>
          <div className="sp-why-pill">Profile Focused</div>
          <div className="sp-why-pill">Global Options</div>
          <div className="sp-why-pill">Clear Process</div>
          <div className="sp-why-pill">Personal Support</div>
        </div>

        <div className="sp-why-list">
          <div className="sp-why-item"><b>Personalised Approach</b><p>Guidance begins with understanding the student rather than pushing a one-size-fits-all route.</p></div>
          <div className="sp-why-item"><b>Destination Knowledge</b><p>Explore established study destinations and compare your available options.</p></div>
          <div className="sp-why-item"><b>Application Support</b><p>Stay organised through the key stages of your application journey.</p></div>
          <div className="sp-why-item"><b>Transparent Guidance</b><p>Get practical information so you can make decisions with greater confidence.</p></div>
          <div className="sp-why-item"><b>Experienced Team</b><p>Work with a team focused on education counselling and international study pathways.</p></div>
          <div className="sp-why-item"><b>Long-Term Support</b><p>Our goal is to support your journey beyond the first conversation.</p></div>
        </div>
      </div>
    </div>
  </section>

  {/*  ================= STATS =================  */}
  <section className="sp-stats sp-section">
    <div className="sp-wrap">
      <div className="sp-stats-grid">
        <div className="sp-stat"><b>2025</b><span>Established</span></div>
        <div className="sp-stat"><b>5.0★</b><span>Google Rating</span></div>
        <div className="sp-stat"><b>227+</b><span>Google Reviews</span></div>
        <div className="sp-stat"><b>6+</b><span>Study Destinations</span></div>
      </div>
    </div>
  </section>

  {/*  ================= ACCREDITATION =================  */}
  {/* <section className="sp-accred sp-section" id="accreditation">
    <div className="sp-wrap">
      <div className="sp-center">
        <div className="sp-eyebrow">Trust & Recognition</div>
        <h2 className="sp-heading">Built on <span>professional credibility.</span></h2>
        <p className="sp-sub">Showcase your accreditation and professional-network logos here without making the section visually heavy.</p>
      </div>

      <div className="sp-accred-grid">
        <div className="sp-accred-card">
          <img decoding="async" src="https://globalexpertimmigration.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-09-at-11.45.43-AM.jpeg" alt="Global Expert Immigration professional recognition" />
        </div>
        <div className="sp-accred-card">
          <img decoding="async" src="https://globalexpertimmigration.com/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-09-at-11.45.44-AM-5.jpeg" alt="Global Expert Immigration professional network" />
        </div>
      </div>
    </div>
  </section> */}

  {/*  ================= CONTACT CTA =================  */}
  <section className="sp-contact-cta sp-section" id="contact">
    <div className="sp-wrap">
      <div className="sp-contact-grid">
        <div>
          <div className="sp-eyebrow">Start Your Journey</div>
          <h2>Ready to take the next step towards studying abroad?</h2>
          <p>
            Speak with Global Expert Immigration Consultants and get a clearer
            direction for your study abroad plans.
          </p>
          <div className="sp-actions">
            <button
              className="sp-btn"
              type="button"
              onClick={() => setShowModal(true)}
              style={{ cursor: "pointer", border: "none" }}
            >
              Book A Consultation →
            </button>
            <a className="sp-btn-light" href="tel:7404040813">Call 7404040813</a>
          </div>
        </div>

        <div className="sp-contact-card">
          <div className="sp-contact-row"><small>Visit Us</small><b>2nd floor, Sco-04, Railway Rd, Ibrahim Mandi, Karnal, Haryana 132001</b></div>
          <div className="sp-contact-row"><small>Call Us</small><b><a href="tel:7404040813">7404040813</a> / <a href="tel:8708715777">8708715777</a></b></div>
          <div className="sp-contact-row"><small>Email</small><b><a href="mailto:globalexpertvisa@gmail.com">globalexpertvisa@gmail.com</a></b></div>
          <div className="sp-contact-row"><small>Online</small><b>globalexpertimmigration.com</b></div>
        </div>
      </div>
    </div>
  </section>

  <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
