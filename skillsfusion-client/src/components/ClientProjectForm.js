import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientProjectForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development & IT',
    budget: '',
    deadline: '',
    clientName: '',
    clientEmail: '',
    contactNumber: ''
  });

  const categories = [
    'Development & IT',
    'Design & Creative',
    'AI Services',
    'Sales & Marketing',
    'Engineering & Architecture'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8081/api/projects/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('Project uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Development & IT',
        budget: '',
        deadline: '',
        clientName: '',
        clientEmail: '',
        contactNumber: ''
      });
    } else {
      alert('Upload failed.');
    }
  };

  // ─── styles ──────────────────────────────────────────────────────────
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    maxWidth: '1000px',
    margin: '40px auto',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', sans-serif"
  };

  const leftPanelStyle = {
    flex: 1,
    background: 'linear-gradient(to bottom right, #1da1f2, #00c6ff)',
    color: 'white',
    padding: '40px 30px'
  };

  const rightPanelStyle = {
    flex: 2,
    backgroundColor: 'white',
    padding: '40px 30px'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const labelStyle = {
    marginTop: '16px',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#333'
  };

  const inputStyle = {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const selectStyle = { ...inputStyle };

  const submitButtonStyle = {
    padding: '14px 24px',
    background: 'linear-gradient(to right, #1da1f2, #00c6ff)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

  const backButtonStyle = {
    padding: '14px 24px',
    backgroundColor: '#90ee90', // light‑green
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };
  // ────────────────────────────────────────────────────────────────────

  return (
    <div style={containerStyle}>
      <div style={leftPanelStyle}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px', marginTop: '300px' }}>
          SkillsFusion
        </h1>
        <p style={{ fontSize: '16px' }}>Connect. Create. Collaborate.</p>
      </div>

      <div style={rightPanelStyle}>
        <h2 style={{ marginBottom: '20px', color: '#1a1a1a' }}>Post a Project</h2>

        <form onSubmit={handleSubmit} style={formStyle}>
          <label style={labelStyle}>Project Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={textareaStyle}
            required
          />

          <label style={labelStyle}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={selectStyle}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label style={labelStyle}>Budget (INR)</label>
          <input
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Deadline</label>
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Client Name</label>
          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Client Email</label>
          <input
            name="clientEmail"
            type="email"
            value={formData.clientEmail}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Contact Number</label>
          <input
            name="contactNumber"
            type="tel"
            pattern="[0-9]{10}"
            title="Enter a 10‑digit mobile number"
            value={formData.contactNumber}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          {/* buttons row */}
         <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'center' }}>
            <button
              type="button"
              style={backButtonStyle}
              onClick={() => navigate('/')}
            >
              ← Back
            </button>

            <button type="submit" style={submitButtonStyle}>
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientProjectForm;
