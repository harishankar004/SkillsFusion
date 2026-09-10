import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientProjectList = () => {
  const [projects, setProjects] = useState([]);
  const clientEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    if (!clientEmail) return;

    fetch(`http://localhost:8081/api/projects/client/${clientEmail}`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching client projects:", err));
  }, [clientEmail]);

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.backButtonWrapper}>
          <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
        </div>
        <div style={styles.titleWrapper}>
          <h2 style={styles.heading}>My Posted Projects</h2>
        </div>
      </div>

      {projects.length === 0 ? (
        <p style={styles.noProjects}>You haven’t posted any projects yet.</p>
      ) : (
        <ul style={styles.projectList}>
          {projects.map((project, index) => (
            <li key={index} style={styles.projectCard}>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p><strong>Category:</strong> <span>{project.category}</span></p>
              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '2rem 1rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    position: 'relative',
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 0,
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#1dbf73',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  titleWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#333',
    margin: 0,
  },
  noProjects: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
  },
  projectList: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1rem',
  },
  projectCard: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  projectTitle: {
    marginBottom: '0.5rem',
    color:'#4169e1',
  },
};

export default ClientProjectList;
