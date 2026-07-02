import { Activity, BookOpen, HeartPulse, Music, Users, Shield } from 'lucide-react';
const therapyImage = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop';

const Programs = () => {
  const programs = [
    {
      title: "Physical Therapy",
      icon: <Activity size={24} />,
      desc: "Customized movement exercises to improve motor skills, balance, and physical independence."
    },
    {
      title: "Inclusive Education",
      icon: <BookOpen size={24} />,
      desc: "Mainstream classroom integration with specialized aides and adaptive learning materials."
    },
    {
      title: "Speech Therapy",
      icon: <HeartPulse size={24} />,
      desc: "Helping children overcome communication barriers and express themselves confidently."
    },
    {
      title: "Music & Art Express",
      icon: <Music size={24} />,
      desc: "Creative outlets designed to improve sensory processing and emotional regulation."
    },
    {
      title: "Parental Support Groups",
      icon: <Users size={24} />,
      desc: "Safe spaces for caregivers to share experiences, gain knowledge, and find emotional support."
    },
    {
      title: "Life Skills Training",
      icon: <Shield size={24} />,
      desc: "Teaching essential daily tasks to foster self-reliance and confidence in older children."
    }
  ];

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1>Our Programs</h1>
          <p>We offer a multidisciplinary approach tailored to the unique needs of every child.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container">
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }} className="slide-up">
            <div style={{ flex: '1 1 400px' }}>
              <img 
                src={therapyImage} 
                alt="Therapy session" 
                style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>A Holistic Approach to Development</h2>
              <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                At InclusiveCare, we understand that no two children are the same. That's why our programs are designed to be highly adaptable. 
                Our team of specialists works closely with families to create an Individualized Care Plan (ICP).
              </p>
              <p style={{ fontSize: '1.1rem' }}>
                Whether it's taking their first independent steps, speaking their first words, or learning to navigate social interactions, we are there every step of the way.
              </p>
            </div>
          </div>

          <div className="card-grid">
            {programs.map((prog, idx) => (
              <div key={idx} className="card slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="card-content">
                  <div className="card-icon">
                    {prog.icon}
                  </div>
                  <h3>{prog.title}</h3>
                  <p>{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Programs;
