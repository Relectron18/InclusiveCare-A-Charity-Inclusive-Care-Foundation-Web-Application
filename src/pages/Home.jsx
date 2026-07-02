import { Link } from 'react-router-dom';
import { Heart, Activity, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import heroImg1 from '../assets/hero_kids_1775331982819.png'; 
import heroImg2 from '../assets/programs_therapy_1775332004555.png';
import heroImg3 from '../assets/success_story_1_1775332487356.png';

const slides = [
  {
    id: 1,
    img: heroImg1,
    title: "Empowering Every Child's Future",
    desc: "Transforming lives through inclusive care, specialized therapy, and unwavering community support for children with special needs."
  },
  {
    id: 2,
    img: heroImg2,
    title: "Specialized Therapy Programs",
    desc: "Expert care designed to nurture their unique potential and build confidence step by step."
  },
  {
    id: 3,
    img: heroImg3,
    title: "Building an Inclusive Society",
    desc: "Together we create opportunities, spark joy, and build environments where every child shines."
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play the slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="fade-in">
      {/* HERO SLIDER */}
      <section className="hero" style={{ position: 'relative' }}>
        
        {/* Background Images Crossfade */}
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="hero-bg" 
            style={{ 
              opacity: index === currentSlide ? 1 : 0, 
              transition: 'opacity 1.2s ease-in-out',
              zIndex: index === currentSlide ? 1 : 0 
            }}
          >
            <img src={slide.img} alt={slide.title} onError={(e) => { e.target.style.display = 'none'; }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8))' }}></div>
          </div>
        ))}

        {/* Carousel Arrow Controls */}
        <button 
          onClick={prevSlide}
          style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'background 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          <ChevronLeft size={30} />
        </button>

        <button 
          onClick={nextSlide}
          style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'background 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          <ChevronRight size={30} />
        </button>

        {/* Text Content */}
        <div className="container hero-content" style={{ zIndex: 10 }}>
          {slides.map((slide, index) => (
            <div 
              key={`text-${slide.id}`} 
              style={{ 
                display: index === currentSlide ? 'block' : 'none',
                animation: index === currentSlide ? 'fadeIn 0.8s ease forwards' : 'none'
              }}
            >
              <h1>{slide.title}</h1>
              <p style={{ animationDelay: '0.1s' }}>{slide.desc}</p>
            </div>
          ))}

          <div className="hero-buttons slide-up" style={{ animationDelay: '0.2s', marginTop: '1.5rem' }}>
            <Link to="/donate" className="btn btn-primary">Donate Now</Link>
            <Link to="/about" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Learn More</Link>
          </div>
        </div>

        {/* Pagination Dots */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 20 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: index === currentSlide ? '30px' : '10px',
                height: '10px',
                borderRadius: '5px',
                background: index === currentSlide ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* STANDARD SECTIONS */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>How We Make a Difference</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Together, we create an environment where every child can thrive and reach their full potential.</p>
          </div>

          <div className="card-grid">
            <div className="card slide-up">
              <div className="card-content">
                <div className="card-icon"><Activity size={24} /></div>
                <h3>Specialized Programs</h3>
                <p>Tailored therapeutic and educational programs designed to meet each child's unique needs and abilities.</p>
                <Link to="/programs" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Explore Programs →</Link>
              </div>
            </div>

            <div className="card slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="card-content">
                <div className="card-icon"><Heart size={24} /></div>
                <h3>Family Support</h3>
                <p>Comprehensive guidance, counseling, and resources for parents and caregivers on this journey.</p>
                <Link to="/stories" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Read Stories →</Link>
              </div>
            </div>

            <div className="card slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="card-content">
                <div className="card-icon"><Users size={24} /></div>
                <h3>Inclusive Community</h3>
                <p>Building a society that embraces diversity and provides equal opportunities for all children.</p>
                <Link to="/impact" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>See Our Impact →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
