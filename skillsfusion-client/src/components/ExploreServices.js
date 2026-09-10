import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Code, Palette, Bot, TrendingUp, Settings
} from 'lucide-react';
import './ExploreServices.css';

const ExploreServices = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); 

  const services = [
    { icon: <Code size={28} />, title: t('devTitle'), subtitle: t('devSubtitle') },
    { icon: <Palette size={28} />, title: t('designTitle'), subtitle: t('designSubtitle') },
    { icon: <Bot size={28} />, title: t('aiTitle'), subtitle: t('aiSubtitle') },
    { icon: <TrendingUp size={28} />, title: t('marketingTitle'), subtitle: t('marketingSubtitle') },
    { icon: <Settings size={28} />, title: t('enggTitle'), subtitle: t('enggSubtitle') }
  ];

  return (
    <section className="explore-section">
      <div className="explore-header">
        <h2>{t('exploreHeading')}</h2>
        <p>{t('exploreSubheading')}</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => {
              if (index === 0) navigate('/development');
              else if (index === 1) navigate('/design');
              else if (index === 2) navigate('/Aiservices');
              else if( index === 3) navigate('/market');
              else if( index === 4) navigate('/engineer')
            }}
            style={{ cursor: index === 0 || index === 1 ? 'pointer' : 'default' }}
          >
            <div className="icon-wrapper">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="explore-footer">
        <button className="browse-button">{t('browseAll')}</button>
      </div>
    </section>
  );
};

export default ExploreServices;
