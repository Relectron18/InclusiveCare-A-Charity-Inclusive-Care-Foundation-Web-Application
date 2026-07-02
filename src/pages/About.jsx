import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Discover our story, mission, and the dedicated team making it all happen.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '4rem' }}>
          
          <div className="slide-up">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Our Story</h2>
            <p style={{ fontSize: '1.125rem' }}>
              InclusiveCare began with a simple belief: every child has boundless potential if given the right environment and support. 
              Founded in 2010 by a group of passionate special educators and parents, we noticed a significant gap in accessible, 
              high-quality holistic care for children with special needs.
            </p>
            <p style={{ fontSize: '1.125rem' }}>
              What started as a small community support group has now blossomed into a full-fledged foundation offering diverse programs ranging from clinical therapy to inclusive schooling environments.
            </p>
          </div>
          
          <div className="card-grid" style={{ marginTop: '2rem' }}>
            <div className="card slide-up" style={{ padding: '2.5rem' }}>
              <h3 style={{ color: 'var(--secondary-color)' }}>Our Mission</h3>
              <p>
                To provide comprehensive, compassionate, and specialized support to children with special needs, empowering them to achieve their full potential while fostering a community of inclusion and understanding.
              </p>
            </div>
            <div className="card slide-up" style={{ padding: '2.5rem', animationDelay: '0.2s' }}>
              <h3 style={{ color: 'var(--accent-color)' }}>Our Vision</h3>
              <p>
                A world where neurodiversity is celebrated, barriers to accessibility are removed, and every child is equipped with the resources they need to lead a fulfilling, independent life.
              </p>
            </div>
          </div>

          <div className="slide-up" style={{ marginTop: '3rem' }}>
            <h2>Why Supporting Children with Special Needs Matters</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
              {[
                "Early intervention significantly reshapes developmental trajectories.",
                "It builds a foundation for long-term independence.",
                "Reduces the economic and emotional strain on families.",
                "Fosters a society that values empathy and diversity.",
                "Ensures the basic human right to education and healthcare.",
                "Unlocks unique talents and perspectives that benefit everyone."
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <CheckCircle color="var(--primary-color)" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
