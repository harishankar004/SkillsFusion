import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Code, ArrowLeft, Smartphone, Globe, Database } from 'lucide-react';
import './DevelopmentPage.css'; // Make sure this is now used

const DevelopmentPage = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const developmentServices = [
    {
      icon: <Globe size={24} />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      icon: <Smartphone size={24} />,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      icon: <Database size={24} />,
      title: 'Backend Development',
      description: 'Robust server-side solutions and API development',
      technologies: ['Python', 'Java', 'PostgreSQL', 'Redis']
    },
  ];

  return (
    <div className="dev-page">
      <div className="dev-header">
        <button className="dev-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="dev-header-content">
          <div className="dev-icon">
            <Code size={48} />
          </div>
          <h1>Development & IT Services</h1>
          <p>Transform your ideas into powerful digital solutions with our comprehensive development services</p>
        </div>
      </div>

      <div className="dev-content">
        <div className="dev-grid">
          {developmentServices.map((service, index) => (
            <div key={index} className="dev-card">
              <div className="dev-icon-small">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="dev-tech">
                {service.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="dev-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="dev-cta">
          <h2>Ready to Build Your Next Project?</h2>
          <p>Let's discuss your requirements and create something amazing together</p>
          <button className="dev-cta-btn">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPage;
