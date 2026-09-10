// MarketingPage.js
import React from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Search, Share2, Mail, Target } from 'lucide-react';
import './MarketingAndSales.css';

const MarketingAndSales = () => {
  //const { t } = useTranslation();
  const navigate = useNavigate();

  const marketingServices = [
    {
      icon: <Search size={24} />,
      title: 'SEO & SEM',
      description: 'Search engine optimization and marketing to increase your online visibility',
      tools: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Google Ads']
    },
    {
      icon: <Share2 size={24} />,
      title: 'Social Media Marketing',
      description: 'Comprehensive social media strategies to engage and grow your audience',
      tools: ['Hootsuite', 'Buffer', 'Canva', 'Meta Business']
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Marketing',
      description: 'Targeted email campaigns that convert leads into loyal customers',
      tools: ['Mailchimp', 'SendGrid', 'Constant Contact', 'ConvertKit']
    },
    {
      icon: <Target size={24} />,
      title: 'Digital Advertising',
      description: 'Paid advertising campaigns across multiple platforms for maximum ROI',
      tools: ['Google Ads', 'Facebook Ads', 'LinkedIn Ads', 'YouTube Ads']
    }
  ];

  return (
    <div className="marketing-page">
      <div className="marketing-header">
        <button className="marketing-back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="marketing-header-content">
          <div className="marketing-icon">
            <TrendingUp size={48} />
          </div>
          <h1>Digital Marketing Services</h1>
          <p>Grow your business with data-driven marketing strategies that deliver measurable results</p>
        </div>
      </div>

      <div className="marketing-content">
        <div className="marketing-grid">
          {marketingServices.map((service, index) => (
            <div key={index} className="marketing-card">
              <div className="marketing-icon-small">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="marketing-tech">
                {service.tools.map((tool, toolIndex) => (
                  <span key={toolIndex} className="marketing-tag">{tool}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketingAndSales;
