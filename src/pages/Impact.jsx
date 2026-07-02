import { useEffect, useState } from 'react';
import { Award, HeartHandshake, Smile } from 'lucide-react';

const Impact = () => {
  const [stats, setStats] = useState({ children: 0, donations: 0, volunteers: 0 });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const targets = { children: 2500, donations: 150, volunteers: 850 };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        children: Math.floor((targets.children / steps) * step),
        donations: Math.floor((targets.donations / steps) * step),
        volunteers: Math.floor((targets.volunteers / steps) * step)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fade-in">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)' }}>
        <div className="container">
          <h1>Our Impact</h1>
          <p>Numbers tell a story of hope, dedication, and community support.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container">

          <div className="impact-grid slide-up" style={{ marginBottom: '5rem' }}>
            <div className="stat-item">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><Smile size={48} color="var(--primary-color)" /></div>
              <div className="stat-number">{stats.children.toLocaleString()}+</div>
              <div className="stat-label">Children Supported</div>
            </div>

            <div className="stat-item">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><Award size={48} color="var(--accent-color)" /></div>
              <div className="stat-number">{stats.donations}Cr+</div>
              <div className="stat-label">Donations Received</div>
            </div>

            <div className="stat-item">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}><HeartHandshake size={48} color="var(--secondary-color)" /></div>
              <div className="stat-number">{stats.volunteers.toLocaleString()}+</div>
              <div className="stat-label">Active Volunteers</div>
            </div>
          </div>

          <div className="slide-up" style={{ animationDelay: '0.2s', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Transparency and Accountability</h2>
            <p style={{ fontSize: '1.2rem', margin: '2rem 0' }}>
              We believe in complete transparency. Every Rupee donated goes towards creating a scalable impact for families who otherwise could not afford specialized care.
            </p>
            <div style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600 }}>Direct Program Costs</span>
                <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>85%</span>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--primary-color)' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0 1rem' }}>
                <span style={{ fontWeight: 600 }}>Administrative & Operations</span>
                <span style={{ fontWeight: 600, color: 'var(--accent-color)' }}>10%</span>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '10%', height: '100%', backgroundColor: 'var(--accent-color)' }}></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1.5rem 0 1rem' }}>
                <span style={{ fontWeight: 600 }}>Fundraising</span>
                <span style={{ fontWeight: 600, color: 'var(--secondary-color)' }}>5%</span>
              </div>
              <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '5%', height: '100%', backgroundColor: 'var(--secondary-color)' }}></div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Impact;
