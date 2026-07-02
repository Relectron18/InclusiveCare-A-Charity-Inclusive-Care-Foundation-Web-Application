import { Quote, X, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import storyImage1 from '../assets/aryan_story.jpg';
import storyImage2 from '../assets/meera_story.jpg';

const SuccessStories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', childName: '', story: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const stories = [
    {
      name: "Aryan's Journey",
      content: "When Aryan first came to InclusiveCare, he was non-verbal and struggled with sensory overload. Two years later, not only is he speaking in full sentences, but he also performed in the annual school play. The dedicated speech and behavioral therapists here changed our lives completely.",
      author: "Priya, Aryan's Mother",
      image: storyImage1
    },
    {
      name: "A New Chapter for Meera",
      content: "Finding an inclusive school that truly understood Meera's learning pace seemed impossible until we found this foundation. She now looks forward to going to school every day. The confidence she has gained is simply beautiful to watch.",
      author: "Rajesh, Meera's Father",
      image: storyImage2
    }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Your name is required';
    if (!formData.childName.trim()) newErrors.childName = "Child's name is required";
    if (formData.story.trim().length < 20) newErrors.story = 'Please share a bit more detail (min. 20 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);

        const today = new Date();
        const newStory = {
          id: `STR${Math.random().toString().slice(2, 8)}`,
          date: today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          fullDate: today.toISOString(),
          name: formData.name,
          childName: formData.childName,
          content: formData.story,
          status: 'Under Review'
        };

        const savedStories = JSON.parse(localStorage.getItem('inclusiveCare_stories')) || [];
        savedStories.push(newStory);
        localStorage.setItem('inclusiveCare_stories', JSON.stringify(savedStories));

        setIsModalOpen(false);
        setShowToast(true);
        setFormData({ name: '', childName: '', story: '' });
        setErrors({});

        setTimeout(() => setShowToast(false), 4000);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  return (
    <div className="fade-in" style={{ position: 'relative' }}>

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
        <span style={{ fontWeight: 600 }}>Thank you for sharing your story!</span>
      </div>

      <div className="page-header">
        <div className="container">
          <h1>Success Stories</h1>
          <p>Real stories of growth, resilience, and triumph from our community.</p>
        </div>
      </div>

      <section className="content-section">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

          {stories.map((story, idx) => (
            <div key={idx} className="slide-up" style={{
              display: 'flex',
              flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
              flexWrap: 'wrap',
              gap: '3rem',
              alignItems: 'center',
              backgroundColor: 'var(--bg-surface)',
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ flex: '1 1 300px' }}>
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.name}
                    style={{ width: '100%', borderRadius: 'var(--radius-md)', objectFit: 'cover', height: '350px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    paddingTop: '75%',
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--text-muted)' }}>
                      Photo Private
                    </div>
                  </div>
                )}
              </div>
              <div style={{ flex: '1 1 400px', position: 'relative' }}>
                <Quote size={48} color="var(--primary-color)" style={{ opacity: 0.1, position: 'absolute', top: '-20px', left: '-20px' }} />
                <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>{story.name}</h3>
                <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: 1.8 }}>
                  "{story.content}"
                </p>
                <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>— {story.author}</div>
              </div>
            </div>
          ))}

          <div className="slide-up" style={{ textAlign: 'center', marginTop: '3rem', padding: '3rem', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Have a story to share?</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '2rem', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Your journey could inspire another family. If InclusiveCare has made a difference in your life, we would be honored to hear from you.
            </p>
            <button className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }} onClick={() => setIsModalOpen(true)}>
              Share Your Story
            </button>
          </div>

        </div>
      </section>

      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="fade-in" style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-lg)',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Submit Your Story</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderColor: errors.name ? '#ef4444' : 'var(--border-color)' }}
                />
                {errors.name && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.name}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Child's Name</label>
                <input
                  type="text"
                  name="childName"
                  value={formData.childName}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g. Aryan"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', borderColor: errors.childName ? '#ef4444' : 'var(--border-color)' }}
                />
                {errors.childName && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.childName}</div>}
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Story</label>
                <textarea
                  name="story"
                  value={formData.story}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Tell us about your journey and the progress you've seen..."
                  rows="5"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical', minHeight: '120px', borderColor: errors.story ? '#ef4444' : 'var(--border-color)' }}
                ></textarea>
                {errors.story && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.25rem' }}>{errors.story}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{ width: '100%', padding: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Story'}
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SuccessStories;
