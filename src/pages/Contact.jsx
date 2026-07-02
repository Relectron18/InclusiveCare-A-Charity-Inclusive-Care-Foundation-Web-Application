import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setShowToast(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setShowToast(false), 4000);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="fade-in" style={{ position: 'relative' }}>
      
      {/* Toast Notification properly positioned at bottom-right */}
      <div style={{
        position: 'fixed',
        bottom: showToast ? '2rem' : '-100px',
        right: '2rem',
        backgroundColor: '#10b981',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.4)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        zIndex: 9999,
        transition: 'bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <CheckCircle2 fill="white" color="#10b981" />
        <span style={{ fontWeight: 600 }}>Message sent successfully!</span>
      </div>

      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have questions or want to get involved? We'd love to hear from you.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container contact-grid">
          
          <div className="contact-details slide-up">
            <h2 style={{ marginBottom: '2rem' }}>Get In Touch</h2>
            <p style={{ marginBottom: '2.5rem' }}>
              Whether you want to volunteer, ask about our programs, or partner with us, our team is ready to answer all your questions.
            </p>
            
            <div className="contact-info-card">
              <div className="contact-icon"><MapPin size={24} /></div>
              <div>
                <h4>Main Office</h4>
                <p style={{ margin: 0 }}>123 Care Lane, Hopeville, IN 45678</p>
              </div>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon"><Phone size={24} /></div>
              <div>
                <h4>Phone Number</h4>
                <p style={{ margin: 0 }}>+91 (123) 456-7890<br/>+91 (987) 654-3210</p>
              </div>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon"><Mail size={24} /></div>
              <div>
                <h4>Email Address</h4>
                <p style={{ margin: 0 }}>contact@inclusivecare.org<br/>support@inclusivecare.org</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container slide-up" style={{ animationDelay: '0.2s' }}>
            <form className="donation-form" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '1.5rem' }}>Send a Message</h3>
              
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="form-input" 
                  style={{ borderColor: errors.name ? '#ef4444' : '' }} 
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="form-input" 
                  style={{ borderColor: errors.email ? '#ef4444' : '' }} 
                />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="form-input" 
                  style={{ borderColor: errors.subject ? '#ef4444' : '' }} 
                />
                {errors.subject && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.subject}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Your Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="form-input" 
                  style={{ borderColor: errors.message ? '#ef4444' : '' }} 
                ></textarea>
                {errors.message && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.message}</div>}
              </div>
              
              <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}>
                <Send size={18} /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Contact;
