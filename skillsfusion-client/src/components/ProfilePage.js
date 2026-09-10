import {useEffect, useState } from 'react';
import './ProfilePage.css'; 
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const email = localStorage.getItem("userEmail");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displaymodal, setDisplaymodal] = useState(false); // ✅ Modal state
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      setError('No email found in localStorage');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8081/api/auth/${email}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setForm({ name: data.name, role: data.role });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/auth/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, ...form }),
      });

      if (res.ok) {
        setEditMode(false);
        setUser(prev => ({ ...prev, ...form }));
        setDisplaymodal(true); // ✅ Show modal on success
      } else {
        alert('Update failed');
      }
    } catch (err) {
      alert('Server error');
      console.error(err);
    }
  };

  const handleModalClose = () => {
    setDisplaymodal(false);
    navigate('/login');
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'rgb(255, 255, 255)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    p: 4,
    textAlign: 'center',
    color: '#0d47a1',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    background: '#00c6ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'background 0.3s ease',
  };

  if (loading) return <p className="profile-loading">Loading profile...</p>;
  if (error) return <p className="profile-error">{error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">{user.name?.charAt(0)}</div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
        <div className="profile-content">
          <div className="form-group">
            <label>Name</label>
            {editMode ? (
              <input
                className="profile-input"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            ) : (
              <div className="profile-value">{user.name}</div>
            )}
          </div>

          <div className="form-group">
            <label>Role</label>
            {editMode ? (
              <select
                className="profile-input"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="CLIENT">CLIENT</option>
                <option value="FREELANCER">FREELANCER</option>
              </select>
            ) : (
              <div className="profile-value">{user.role}</div>
            )}
          </div>

          <div className="profile-actions">
            {editMode ? (
              <div className="edit-actions">
                <button className="save-btn" onClick={handleUpdate}>Save</button>
                <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            ) : (
              <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Modal appears on successful save */}
      <Modal open={displaymodal} onClose={handleModalClose}>
        <Box sx={style}>
          <h2 style={{ color: '#00c6ff', fontWeight: 'bold' }}>Profile Updated</h2>
          <p style={{ margin: '10px 0', color: '#333' }}>
            Your profile has been successfully updated.
          </p>
          <button
            onClick={handleModalClose}
            style={buttonStyle}
            onMouseOver={e => (e.target.style.background = '#0095c5')}
            onMouseOut={e => (e.target.style.background = '#00c6ff')}
          >
            Please Login
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePage;