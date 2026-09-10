import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CategoryProjectList.css';

const CategoryProjectList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (!category) return;

    fetch(
      `http://localhost:8081/api/projects/category/${encodeURIComponent(
        category
      )}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching:', err));
  }, [category]);

  const handleApply = (projectId) => navigate(`/apply/${projectId}`);

  const handleChat = (clientEmail) =>
    navigate(`/chat?to=${encodeURIComponent(clientEmail)}`);

  const handleBack = () => navigate('/');

  return (
    <div className="category-page">
      <h2>Projects in Category: {category || 'N/A'}</h2>

      {projects.length === 0 ? (
        <p>No projects found in this category.</p>
      ) : (
        <ul className="project-list">
          {projects.map((p) => (
            <li key={p.id || p.title} className="project-card">
              <h3>{p.title}</h3>
              <p>
                <strong>Description:</strong> {p.description}
              </p>
              <p>
                <strong>Budget:</strong> ₹{p.budget}
              </p>
              <p>
                <strong>Deadline:</strong> {p.deadline}
              </p>
              <p>
                <strong>Client Name:</strong> {p.clientName}
              </p>
              <p>
                <strong>Client Email:</strong> {p.clientEmail}
              </p>
              <p>
                <strong>Contact Number:</strong> {p.contactNumber}
              </p>

              {/* Centered button group */}
              <div className="project-buttons">
                <button
                  onClick={() => handleApply(p.id)}
                  className="apply-btn"
                >
                  Apply
                </button>
                <button
                  onClick={() => handleChat(p.clientEmail)}
                  className="chat-btn"
                >
                  Chat
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Home button */}
      <div className="catproj-home-btn-container">
        <button className="catproj-home-btn" onClick={handleBack}>
          ← Home
        </button>
      </div>
    </div>
  );
};

export default CategoryProjectList;
