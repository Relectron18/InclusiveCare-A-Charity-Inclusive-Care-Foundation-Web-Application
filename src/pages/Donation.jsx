import { useState } from 'react';
import { Heart, ShieldCheck, CreditCard, FileText, Download, CheckCircle2 } from 'lucide-react';

const Donation = () => {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  const predefinedAmounts = ['500', '1000', '2500', '5000', '10000', '25000'];

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
    if (errors.amount) setErrors({ ...errors, amount: null });
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount('custom');
    if (errors.amount) setErrors({ ...errors, amount: null });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.match(/^\+?[0-9]{10,14}$/)) {
      newErrors.phone = 'Please enter a valid phone number (10 digits)';
    }
    const finalAmount = amount === 'custom' ? customAmount : amount;
    if (!finalAmount || isNaN(finalAmount) || parseInt(finalAmount) < 100) {
      newErrors.amount = 'Please enter a valid amount (Minimum ₹100)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const finalAmount = amount === 'custom' ? customAmount : amount;
      
      setTimeout(() => {
        setIsSubmitting(false);
        
        const today = new Date();
        const newTxn = {
          id: `TXN${Math.random().toString().slice(2, 10)}`,
          date: today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          time: today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          fullDate: today.toISOString(),
          amount: finalAmount,
          ...formData
        };
        
        const savedDonations = JSON.parse(localStorage.getItem('inclusiveCare_donations')) || [];
        savedDonations.push(newTxn);
        localStorage.setItem('inclusiveCare_donations', JSON.stringify(savedDonations));

        setTransactionDetails(newTxn);
      }, 2000);
    }
  };

  const resetForm = () => {
    setTransactionDetails(null);
    setFormData({ name: '', email: '', phone: '' });
    setAmount('1000');
    setCustomAmount('');
    setErrors({});
  };

  if (transactionDetails) {
    return (
      <div className="fade-in" style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <CheckCircle2 size={64} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
            <h1 style={{ marginBottom: '0.5rem' }}>Payment Successful!</h1>
            <p>Thank you for empowering children with special needs.</p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              backgroundColor: 'var(--bg-main)', 
              padding: '1.5rem 2rem', 
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                <FileText size={20} />
                <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Donation Receipt</span>
              </div>
              <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => window.print()}>
                <Download size={16} /> Save PDF
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Transaction ID</p>
                  <p style={{ fontWeight: 600 }}>{transactionDetails.id}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Date & Time</p>
                  <p style={{ fontWeight: 600 }}>{transactionDetails.date} at {transactionDetails.time}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', borderBottom: '1px dashed var(--border-color)', padding: '1.5rem 0', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Donor Name</span>
                  <span style={{ fontWeight: 500 }}>{transactionDetails.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Email Address</span>
                  <span style={{ fontWeight: 500 }}>{transactionDetails.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Phone Number</span>
                  <span style={{ fontWeight: 500 }}>{transactionDetails.phone}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total Amount</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                  ₹{parseInt(transactionDetails.amount).toLocaleString()}
                </span>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'rgba(29, 78, 216, 0.05)', padding: '1rem 2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              This receipt is eligible for 80G tax deductions.
            </div>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} onClick={resetForm}>
            Make Another Donation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%)' }}>
        <div className="container">
          <h1>Support Our Cause</h1>
          <p>Your generosity helps us provide therapy, education, and support to children who need it most.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container donation-wrapper">
          
          <div className="donation-info slide-up">
            <h2>Why Donate?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Every contribution, no matter the size, helps us create an inclusive society where every child has the opportunity to shine.
            </p>
            
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <ShieldCheck color="var(--primary-color)" />
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>100% Secure & Transparent</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>All transactions are encrypted and we provide annual transparency reports.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Heart color="var(--accent-color)" />
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Direct Impact</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>90% of your donation goes directly towards child support programs.</p>
                </div>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CreditCard color="var(--primary-color)" />
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>Tax Deductible</h4>
                  <p style={{ fontSize: '0.9rem', margin: 0 }}>All donations are 80G tax deductible as per government regulations.</p>
                </div>
              </li>
            </ul>

            <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)', borderLeft: '4px solid var(--primary-color)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin: 0, fontStyle: 'italic', fontWeight: 500 }}>
                "We make a living by what we get, but we make a life by what we give."
              </p>
            </div>
          </div>

          <div className="donation-form-container slide-up" style={{ animationDelay: '0.2s' }}>
            <form className="donation-form" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '1.5rem' }}>Select Amount</h3>
              
              <div className="amount-grid">
                {predefinedAmounts.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`amount-btn ${amount === val ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect(val)}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>
              
              <div className="form-group" style={{ marginTop: '1rem' }}>
                <div className={`custom-amount ${amount === 'custom' ? 'selected' : ''}`} style={{ borderColor: errors.amount ? '#ef4444' : '' }}>
                  <span>₹</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    onClick={() => setAmount('custom')}
                    min="100"
                  />
                </div>
                {errors.amount && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>{errors.amount}</div>}
              </div>

              <h3 style={{ margin: '2rem 0 1.5rem' }}>Personal Information</h3>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" placeholder="John Doe" style={{ borderColor: errors.name ? '#ef4444' : '' }} />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder="john@example.com" style={{ borderColor: errors.email ? '#ef4444' : '' }} />
                {errors.email && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="9876543210" style={{ borderColor: errors.phone ? '#ef4444' : '' }} />
                {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.phone}</div>}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem', opacity: isSubmitting ? 0.7 : 1 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Payment...' : 'Proceed to Donate'}
              </button>
              
              <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                By donating, you agree to our terms of service and privacy policy. Secure payment via Razorpay/Stripe.
              </p>
            </form>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Donation;
