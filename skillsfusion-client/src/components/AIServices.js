// AIServices.js

import React from 'react';
import './AIServices.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRobot, FaCode, FaChartLine } from 'react-icons/fa';
import { SiPytorch } from 'react-icons/si';

const AIServices = () => {
  const navigate = useNavigate();

  return (
    <div className="ai-page">
      <div className="ai-header">
        <button className="ai-back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>

        <div className="ai-icon">
          <FaRobot />
        </div>

        <div className="ai-header-content">
          <h1>AI Development Services</h1>
          <p>
            Discover intelligent automation, machine learning, and AI-powered tools to bring your ideas to life.
          </p>
        </div>
      </div>

      <div className="ai-grid">
        <div className="ai-card">
          <div className="ai-icon-small">
            <FaCode />
          </div>
          <h3>Custom AI Tools</h3>
          <p>We build tailored AI apps to automate your business workflows and enhance decision-making.</p>
          <div className="ai-tech">
            <span className="ai-tech-tag">Python</span>
            <span className="ai-tech-tag">TensorFlow</span>
            <span className="ai-tech-tag">OpenAI</span>
          </div>
        </div>

        <div className="ai-card">
          <div className="ai-icon-small">
            <FaChartLine />
          </div>
          <h3>Data Analytics</h3>
          <p>Extract insights from data using ML models, dashboards, and predictive analytics pipelines.</p>
          <div className="ai-tech">
            <span className="ai-tech-tag">Scikit-learn</span>
            <span className="ai-tech-tag">Pandas</span>
            <span className="ai-tech-tag">Power BI</span>
          </div>
        </div>

        <div className="ai-card">
          <div className="ai-icon-small">
            <SiPytorch />
          </div>
          <h3>ML Model Training</h3>
          <p>Train, fine-tune, and deploy models using PyTorch, TensorFlow, and cloud services.</p>
          <div className="ai-tech">
            <span className="ai-tech-tag">PyTorch</span>
            <span className="ai-tech-tag">HuggingFace</span>
            <span className="ai-tech-tag">AWS SageMaker</span>
          </div>
        </div>
      </div>

      {/* Skills Section */}
    </div>
  );
};

export default AIServices;
