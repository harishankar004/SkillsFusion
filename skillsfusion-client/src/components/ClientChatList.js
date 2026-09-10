import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientChatList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const clientEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientEmail) return;

    fetch(`http://localhost:8081/api/applications/client/${clientEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch freelancers");
        return res.json();
      })
      .then((data) => setFreelancers(data))
      .catch((err) => console.error("Error fetching freelancers:", err));
  }, [clientEmail]);

 const handleChat = (freelancerEmail, freelancerName) => {
  navigate(`/chat?to=${freelancerEmail}&name=${encodeURIComponent(freelancerName)}`);
};
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={handleBack} style={styles.backButton}>← Back</button>
      </div>
      <h2 style={styles.heading}>Your Freelancers</h2>
      {freelancers.length === 0 ? (
        <p style={styles.noFreelancers}>No freelancers have applied to your projects yet.</p>
      ) : (
        <ul style={styles.list}>
          {freelancers.map((f, idx) => (
            <li key={idx} style={styles.card}>
              <p><strong>Name:</strong> {f.fullName}</p>
              <p><strong>Email:</strong> {f.email}</p>
              <button onClick={() => handleChat(f.email, f.fullName)} style={styles.chatButton}>
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', sans-serif"
  },
  topBar: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '1rem'
  },
  backButton: {
    backgroundColor: '#a4f3a4',
    color: '#065f46',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  },
  heading: {
    textAlign: 'center',
    color: '#007acc',
    marginBottom: '1.5rem'
  },
  noFreelancers: {
    textAlign: 'center',
    color: '#555'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gap: '1.5rem'
  },
  card: {
    padding: '1.5rem',
    borderRadius: '10px',
    backgroundColor: '#f9fcff',
    border: '1px solid #cce6ff',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.05)'
  },
  chatButton: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#00aaff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  }
};

export default ClientChatList;
