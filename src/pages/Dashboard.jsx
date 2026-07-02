import { useState, useEffect } from 'react';
import { User, Receipt, Clock, FolderArchive, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [donations, setDonations] = useState([]);
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    const savedDonations = JSON.parse(localStorage.getItem('inclusiveCare_donations')) || [];
    const sortedDonations = savedDonations.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));
    setDonations(sortedDonations);
    
    const savedStories = JSON.parse(localStorage.getItem('inclusiveCare_stories')) || [];
    
    // Auto-approve stories older than 60 seconds
    const updatedStories = savedStories.map(story => {
      if (story.status === 'Under Review') {
        const now = new Date();
        const storyDate = new Date(story.fullDate);
        const diffInSeconds = (now - storyDate) / 1000;
        if (diffInSeconds > 60) {
          story.status = 'Approved';
        }
      }
      return story;
    });
    
    localStorage.setItem('inclusiveCare_stories', JSON.stringify(updatedStories));
    const sortedStories = updatedStories.sort((a, b) => new Date(b.fullDate) - new Date(a.fullDate));
    
    setStories(sortedStories);
  }, []);

  return (
    <div className="fade-in section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={40} />
          </div>
          <div>
            <h1 style={{ marginBottom: '0.25rem' }}>My Dashboard</h1>
            <p style={{ margin: 0 }}>Welcome back! Track your philanthropic impact right here.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
          
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Donated</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                ₹{donations.reduce((acc, curr) => acc + parseInt(curr.amount), 0).toLocaleString()}
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Contributions</div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{donations.length}</div>
            </div>
            
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Stories Shared</div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{stories.length}</div>
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <Receipt color="var(--primary-color)" />
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Donation History</h2>
            </div>

            {donations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <FolderArchive size={48} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--text-muted)' }}>No donations found</h3>
                <p>Looks like you haven't made a contribution yet. Let's change a life today!</p>
                <Link to="/donate" className="btn btn-primary" style={{ marginTop: '1rem' }}>Make a Donation</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '1rem', fontWeight: 600 }}>Transaction ID</th>
                      <th style={{ padding: '1rem', fontWeight: 600 }}>Date</th>
                      <th style={{ padding: '1rem', fontWeight: 600 }}>Time</th>
                      <th style={{ padding: '1rem', fontWeight: 600 }}>Amount</th>
                      <th style={{ padding: '1rem', fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((txn, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="hover-light">
                        <td style={{ padding: '1rem', fontFamily: 'monospace', fontWeight: 600 }}>{txn.id}</td>
                        <td style={{ padding: '1rem' }}>{txn.date}</td>
                        <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={14} /> {txn.time}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--primary-color)' }}>₹{parseInt(txn.amount).toLocaleString()}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem', fontWeight: 600 }}>
                            Success
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>

            {/* Stories Section */}
            <div style={{ backgroundColor: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <BookOpen color="var(--primary-color)" />
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>My Submitted Stories</h2>
              </div>

              {stories.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <FolderArchive size={40} color="var(--border-color)" style={{ margin: '0 auto 1rem' }} />
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>You haven't shared any stories yet. Head over to Success Stories to share yours!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {stories.map((story) => (
                    <div key={story.id} style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>Child: {story.childName}</span>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{story.date}</span>
                          <span style={{ backgroundColor: story.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', color: story.status === 'Approved' ? '#10b981' : '#d97706', padding: '0.1rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600 }}>{story.status}</span>
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', fontStyle: 'italic' }}>"{story.content}"</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
