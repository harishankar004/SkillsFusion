import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_BASE_URL} from "../config/api";

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: '100vh',
    backgroundColor: '#f5f7fa'
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
    marginBottom: '1.5rem',
    fontSize: '2rem'
  },
  noFreelancers: {
    textAlign: 'center',
    color: '#555',
    fontSize: '1.1rem'
  },
  list: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gap: '1.5rem',
    width: '100%'
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

const FreelancerChatList = () => {
  const [clients, setClients] = useState([]);
  const freelancerEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  useEffect(() => {
    if (!freelancerEmail) return;

    fetch(`${API_BASE_URL}/api/applications/freelancer/${freelancerEmail}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch clients');
        return res.json();
      })
      .then((data) => setClients(data))
      .catch((err) => console.error('Error fetching clients:', err));
  }, [freelancerEmail]);

  const handleChat = (clientEmail, clientName) => {
  navigate(`/chat?to=${clientEmail}&name=${encodeURIComponent(clientName)}`);
};
  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      <h2 style={styles.heading}>Your Clients</h2>

      {clients.length === 0 ? (
        <p style={styles.noFreelancers}>You haven't applied to any projects yet.</p>
      ) : (
        <ul style={styles.list}>
          {clients.map((c, idx) => (
            <li key={idx} style={styles.card}>
              <p style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                <strong>Client Name:</strong> {c.project.clientName}
              </p>
              <p style={{ marginBottom: '0.5rem', color: '#555' }}>
                <strong>Email:</strong> {c.project.clientEmail}
              </p>
              <p style={{ marginBottom: '1rem', color: '#555' }}>
                <strong>Project:</strong> {c.project.title}
              </p>
              <button
                style={styles.chatButton}
                onClick={() => handleChat(c.project.clientEmail, c.project.clientName)}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = '#008ecc')
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = '#00aaff')
                }
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FreelancerChatList;
