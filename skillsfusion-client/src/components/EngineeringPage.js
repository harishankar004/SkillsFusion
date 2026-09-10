import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Settings, ArrowLeft, Cog, Shield, Monitor, Wrench } from 'lucide-react';
import './EngineeringPage.css'; // Change file name to avoid overlap

const EngineeringPage = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const engineeringServices = [
    {
      icon: <Cog size={24} />,
      title: 'System Architecture',
      description: 'Design and implementation of scalable, robust system architectures',
      technologies: ['Microservices', 'API Gateway', 'Load Balancing', 'Service Mesh']
    },
    {
      icon: <Shield size={24} />,
      title: 'DevOps & Security',
      description: 'Continuous integration, deployment, and comprehensive security solutions',
      technologies: ['Jenkins', 'GitLab CI', 'Terraform', 'Security Auditing']
    },
    {
      icon: <Monitor size={24} />,
      title: 'Infrastructure Management',
      description: 'Cloud infrastructure setup, monitoring, and optimization',
      technologies: ['AWS', 'Azure', 'Monitoring', 'Performance Tuning']
    },
    {
      icon: <Wrench size={24} />,
      title: 'Technical Consulting',
      description: 'Expert guidance on technology decisions and implementation strategies',
      technologies: ['Architecture Review', 'Code Audit', 'Best Practices', 'Training']
    }
  ];

  return (
    <div className="engineering-page">
      <div className="engineering-header">
        <button className="engineering-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="engineering-header-content">
          <div className="engineering-service-icon">
            <Settings size={48} />
          </div>
          <h1>Engineering Services</h1>
          <p>Expert engineering solutions to optimize your systems and accelerate your technical capabilities</p>
        </div>
      </div>

      <div className="engineering-content">
        <div className="engineering-services-grid">
          {engineeringServices.map((service, index) => (
            <div key={index} className="engineering-detail-card">
              <div className="engineering-icon-small">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="engineering-technologies">
                {service.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="engineering-tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineeringPage;
