import { useEffect, useRef, useState } from 'react';
import './style.css'; // Make sure the path is correct depending on your setup

function App() {
  const heroRef = useRef(null);
  const fadeRefs = useRef([]);

  // Setup the Intersection Observer for animations and sticky bar
  useEffect(() => {
    // 1. Observer for fade-in animations
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    fadeRefs.current.forEach((el) => {
      if (el) fadeObserver.observe(el);
    });

    // Cleanup function
    return () => {
      fadeObserver.disconnect();
    };
  }, []);

  // Helper to add elements to fadeRefs array
  const addToFadeRefs = (el) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  return (
    <>
      <style>{`
        /* Specific overrides for the poster's typography style */
        .hero h4 {
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          color: var(--color-text-muted);
          text-transform: uppercase;
        }
        
        .hero .top-chant {
          font-size: 14px;
          margin-bottom: 32px;
          letter-spacing: 0.1em;
          color: var(--color-text-muted);
        }
        
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 42px;
          color: var(--color-accent-gold);
          margin-bottom: 8px;
        }
        
        .hero h2 {
          font-family: var(--font-body);
          font-size: 18px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        .hero .quote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 18px;
          line-height: 1.5;
          color: var(--color-text-muted);
          max-width: 90%;
          margin: 0 auto 32px auto;
        }
        
        .hero .closing {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 18px;
          margin-top: 16px;
          color: var(--color-text-primary);
        }
        
        .date-badge {
          background-color: var(--color-text-primary);
          color: var(--color-bg-primary);
        }
        
        .timeline-card.visarjan .date-badge {
          background-color: var(--color-accent-gold);
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="hero container fade-in-section is-visible"
        id="hero"
        ref={heroRef}
      >
        <div className="top-chant">|| श्री गणेशाय नमः ||</div>

        <svg
          className="hero-icon ganpati-svg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crown / Mukut */}
          <path pathLength="1" d="M 80 50 Q 100 30 120 50 L 115 60 Q 100 55 85 60 Z" />
          <path pathLength="1" d="M 90 40 L 100 20 L 110 40" />
          {/* Left Ear */}
          <path pathLength="1" d="M 85 65 C 50 60, 30 90, 60 110 C 70 115, 80 110, 85 100" />
          {/* Right Ear */}
          <path pathLength="1" d="M 115 65 C 150 60, 170 90, 140 110 C 130 115, 120 110, 115 100" />
          {/* Head & Trunk */}
          <path pathLength="1" d="M 85 65 C 95 65, 105 65, 115 65 C 115 80, 110 95, 100 110 C 90 125, 120 140, 105 160 C 95 170, 85 155, 90 145" />
          {/* Eyes */}
          <path pathLength="1" d="M 85 85 Q 92 90 95 85" />
          <path pathLength="1" d="M 105 85 Q 112 90 115 85" />
          {/* Tusk */}
          <path pathLength="1" d="M 88 105 L 80 115" />
          <path pathLength="1" d="M 112 105 L 118 110" />
          {/* Tika */}
          <path pathLength="1" d="M 98 72 L 100 78 L 102 72 Z" />
        </svg>

        <h4>
          With the blessings of
          <br />
          Lord Ganesha
          <br />
          You are cordially invited to our
        </h4>

        <h1>Ganpati</h1>
        <h2>Celebration</h2>

        <div className="quote">
          "May Lord Ganesha fill your home
          <br />
          with happiness, prosperity and
          <br />
          good fortune."
        </div>

        <p className="closing">
          Looking forward to your presence,
          <br />
          <strong>From Gali family</strong>
        </p>

        <svg className="scroll-indicator" viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </section>

      {/* Divider */}
      <div className="divider container">
        <div className="divider-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 4 L16 12 L12 20 L8 12 Z" />
          </svg>
        </div>
      </div>

      {/* Location Section */}
      <section
        className="location container fade-in-section"
        id="location"
        ref={addToFadeRefs}
      >
        <div className="section-header">
          <h2>Venue & Directions</h2>
          <p
            style={{
              marginTop: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '13px',
            }}
          >
            At Our Residence
          </p>
        </div>

        <div className="card map-card">
          <iframe
            className="map-embed"
            title="Ganpati Celebration Location Map"
            src="https://maps.google.com/maps?q=601,+I-wing,+Mahalaxmi+CHS,+Gopal+nagar,+opp+Paragon+centre,+Worli,+Mumbai+-+400030&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>

        <a
          href="https://maps.google.com/?q=Mahalaxmi+CHS,+Gopal+nagar,+Worli,+Mumbai"
          className="btn-primary btn-full-width"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>

        <div className="map-info">
          <p>
            <strong>601, I- wing, Mahalaxmi CHS</strong>
            <br />
            Gopal nagar, opp Paragon centre
            <br />
            Worli, Mumbai - 30
            <br /><br />
            <strong>Contact:</strong>
            <br />
            Chaitanya Gali (+91 7977862412)
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="divider container">
        <div className="divider-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 4 L16 12 L12 20 L8 12 Z" />
          </svg>
        </div>
      </div>

      {/* Event Schedule Section */}
      <section
        className="schedule container fade-in-section"
        id="schedule"
        ref={addToFadeRefs}
      >
        <div className="section-header">
          <h2>Celebration Schedule</h2>
          <p style={{ marginTop: '8px' }}>14 & 15 SEPTEMBER</p>
        </div>

        <div className="schedule-list">
          {/* Day 1 Card */}
          <div className="card timeline-card">
            <div className="date-badge">14 September</div>
            <h3>Ganpati Sthapna</h3>
            <ul className="timing-list">
              <li>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Morning Sthapna & Puja
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Evening Aarti
              </li>
            </ul>
          </div>

          {/* Day 2 Card */}
          <div className="card timeline-card">
            <div className="date-badge">15 September</div>
            <h3>Darshan & Aarti</h3>
            <ul className="timing-list">
              <li>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Morning Aarti
              </li>
              <li>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Evening Aarti
              </li>
            </ul>
          </div>

          {/* Visarjan Card */}
          <div className="card timeline-card visarjan">
            <div className="date-badge">15 September</div>
            <h3>Visarjan Ceremony</h3>
            <ul className="timing-list">
              <li>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Farewell Aarti & Procession
              </li>
            </ul>
          </div>
        </div>
      </section>



    </>
  );
}

export default App;
