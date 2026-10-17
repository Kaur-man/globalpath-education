import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  Target,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Help students explore educational opportunities and make informed decisions about their future.",
  },
  {
    icon: Compass,
    title: "Our Vision",
    description:
      "Make international education guidance easier to understand, accessible and student-focused.",
  },
  {
    icon: HeartHandshake,
    title: "Our Values",
    description:
      "Build trust through honest communication, personalized guidance and respect for every student.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "Understand each student's goals before exploring courses, universities and application options.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div>
            <span className="eyebrow">GET TO KNOW US</span>
            <h1>
              Your dreams.
              <span> Our commitment.</span>
            </h1>
            <p>
              We believe every student deserves the opportunity to explore their
              potential. We're here to help make your international education
              journey clearer and more manageable.
            </p>
            <Link href="/#contact" className="button">
              Let's Talk About Your Goals <ArrowRight size={18} />
            </Link>
          </div>

          <img
            className="about-hero-image"
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1100&q=85"
            alt="Students walking together at a university"
          />
        </div>
      </section>

      <section className="section">
        <div className="container story-grid">
          <div className="story-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85"
              alt="Students collaborating on an academic project"
              loading="lazy"
            />
          </div>

          <div className="story-copy">
            <span className="eyebrow">OUR STORY</span>
            <h2>Education opens doors to new possibilities.</h2>
            <p>
              Choosing to study abroad is an important decision. Students need
              to compare courses, understand admission requirements, prepare
              documents and plan their next steps.
            </p>
            <p>
              GlobalPath Education aims to make this process more organized by
              helping students understand their options and navigate their
              journey with greater confidence.
            </p>
            <p>
              We believe guidance should be personal, transparent and centered
              on each student's aspirations.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">WHAT GUIDES US</span>
            <h2>Our mission, vision and values</h2>
            <p>The principles that shape the way we support students.</p>
          </div>

          <div className="value-grid">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article className="value-card" key={value.title}>
                  <div className="icon-box">
                    <Icon size={25} />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container commitment-panel">
          <span className="eyebrow">YOUR JOURNEY MATTERS</span>
          <h2>Let's make your next step an informed one.</h2>
          <p>
            Share your goals, ask questions and explore the options that fit
            your academic plans.
          </p>
          <Link href="/#contact" className="button">
            Book a Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
