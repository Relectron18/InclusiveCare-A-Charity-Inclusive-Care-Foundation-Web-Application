import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Stories', path: '/stories' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container nav-container" style={{ height: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="logo-link">
          <Heart fill="var(--primary-color)" stroke="var(--primary-color)" size={28} />
          <span>InclusiveCare</span>
        </Link>

        <nav className={`nav-links ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
            <User size={18} /> Account
          </Link>
          <Link to="/donate" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
            Donate Now
          </Link>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none' }}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};

export default Header;
