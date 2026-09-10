import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [clientEmail, setClientEmail] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    linkedIn: '',
    githubLink: '',
    githubProject1: '',
    githubProject2: '',
    portfolioLink: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api/projects/${projectId}`)
      .then(res => res.json())
      .then(data => {
        setClientEmail(data.clientEmail);
      });
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, clientEmail, projectId };

    const response = await fetch('http://localhost:8081/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    if (response.ok) {
      setShowSuccessPopup(true);
    } else {
      alert('Failed to submit application: ' + text);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/');
  };

  const SuccessPopup = () => (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '450px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          animation: 'popupSlideIn 0.3s ease-out',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '30px',
            color: 'white',
          }}
        >
          ✓
        </div>
        
        <h2
          style={{
            color: '#333',
            marginBottom: '15px',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          Application Submitted!
        </h2>
        
        <p
          style={{
            color: '#666',
            marginBottom: '25px',
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        >
          Thank you, {formData.fullName}! Your application for Project ID: {projectId} has been submitted successfully. The client will review your application and get back to you soon.
        </p>
        
        <button
          onClick={handlePopupClose}
          style={{
            backgroundColor: '#00c6ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0099cc'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#00c6ff'}
        >
          Back to Home
        </button>
      </div>
      
      <style>
        {`
          @keyframes popupSlideIn {
            0% {
              opacity: 0;
              transform: translateY(-20px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        width: '900px',
        minHeight: '400px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* Left Panel */}
        <div style={{
          flex: 1,
          background: 'linear-gradient(135deg, #00c6ff, #0072ff)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '6px' }}>SkillsFusion</h1>
          <p style={{ fontSize: '15px', textAlign: 'center' }}>Connect. Create. Collaborate.</p>
        </div>

        {/* Right Panel */}
        <div style={{
          flex: 1.3,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '6px', color: '#002b5b' }}>
            Apply for Project
          </h2>
          <p style={{ marginBottom: '15px', color: '#555' }}>
            Submit your application for Project ID: {projectId}
          </p>

          <form onSubmit={handleSubmit}>
            {[ 
              { name: 'fullName', placeholder: 'Full Name', type: 'text' },
              { name: 'email', placeholder: 'Your Email', type: 'email' },
              { name: 'phoneNumber', placeholder: 'Phone Number', type: 'text' },
              { name: 'linkedIn', placeholder: 'LinkedIn URL', type: 'text' },
              { name: 'githubLink', placeholder: 'GitHub URL', type: 'text' },
              { name: 'githubProject1', placeholder: 'GitHub Project 1', type: 'text' },
              { name: 'githubProject2', placeholder: 'GitHub Project 2', type: 'text' },
              { name: 'portfolioLink', placeholder: 'Portfolio Link', type: 'text' },
            ].map((field, idx) => (
              <input
                key={idx}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                required={['fullName', 'email', 'phoneNumber'].includes(field.name)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  margin: '8px 0',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
              <button 
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
              >
                Cancel
              </button>
              <button type="submit" style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#00c6ff',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0099cc'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#00c6ff'}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default ApplicationForm;
