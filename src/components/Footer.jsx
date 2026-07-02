import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo-link">
              <Heart fill="var(--primary-color)" />
              <span>InclusiveCare</span>
            </Link>
            <p>Empowering children with special needs out of love, care, and inclusivity. Together, we can build a better tomorrow.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', color: 'var(--text-muted)' }}>
              <Facebook style={{ cursor: 'pointer' }} />
              <Twitter style={{ cursor: 'pointer' }} />
              <Instagram style={{ cursor: 'pointer' }} />
            </div>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/programs">Our Programs</Link></li>
              <li><Link to="/stories">Success Stories</Link></li>
              <li><Link to="/donate">Make a Donation</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Contact Info</h4>
            <ul>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={18} /> 123 Care Lane, Hopeville, IN 45678
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Phone size={18} /> +91 (123) 456-7890
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Mail size={18} /> contact@inclusivecare.org
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} InclusiveCare Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
