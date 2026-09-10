import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Palette, ArrowLeft, Paintbrush, Layout, Image } from 'lucide-react';
import './DesignPage.css';

const DesignPage = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();

  const designServices = [
    {
      icon: <Layout size={24} />,
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement',
      tools: ['Figma', 'Adobe XD', 'Sketch', 'Principle']
    },
    {
      icon: <Paintbrush size={24} />,
      title: 'Brand Identity',
      description: 'Complete brand identity packages including logos, color schemes, and guidelines',
      tools: ['Illustrator', 'Photoshop', 'InDesign', 'After Effects']
    },
    {
      icon: <Image size={24} />,
      title: 'Graphic Design',
      description: 'Creative visual solutions for print and digital media',
      tools: ['Photoshop', 'Illustrator', 'Canva', 'CorelDRAW']
    },
  ];

  return (
    <div className="design-page">
      <div className="design-header">
        <button className="design-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="design-header-content">
          <div className="design-icon">
            <Palette size={48} />
          </div>
          <h1>Design Services</h1>
          <p>Create stunning visual experiences that captivate your audience and communicate your brand message</p>
        </div>
      </div>

      <div className="design-content">
        <div className="design-grid">
          {designServices.map((service, index) => (
            <div key={index} className="design-card">
              <div className="design-icon-small">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="design-tools">
                {service.tools.map((tool, toolIndex) => (
                  <span key={toolIndex} className="design-tool-tag">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="design-cta">
          <h2>Let's Bring Your Vision to Life</h2>
          <p>Ready to create designs that make an impact? Let's start your project today</p>
          <button className="design-cta-btn">Start Design Project</button>
        </div>
      </div>
    </div>
  );
};

export default DesignPage;
