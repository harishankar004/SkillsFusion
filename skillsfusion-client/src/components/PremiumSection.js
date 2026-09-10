import React, { useState } from 'react';
import './PremiumSection.css';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    name: 'Starter',
    priceMonthly: 29,
    priceYearly: 278,
    description: 'Perfect for freelancers just getting started',
    features: ['5 Projects', 'Basic templates', 'Email support', 'Client portal access'],
    cta: 'Get Starter',
    theme: 'starter',
  },
  {
    name: 'Professional',
    priceMonthly: 59,
    priceYearly: 566,
    description: 'Most popular for growing freelancers',
    features: [
      'Unlimited projects',
      'Advanced templates & workflows',
      'Priority support',
      'Advanced client portal',
      'Automated invoicing & payments',
      'Advanced time tracking & reports',
      'Contract management',
      'Team collaboration (up to 3 members)',
    ],
    cta: 'Start Free Trial',
    theme: 'professional',
    popular: true,
  },
  {
    name: 'Enterprise',
    priceMonthly: 99,
    priceYearly: 950,
    description: 'For agencies managing large teams & clients',
    features: [
      'All Pro features',
      'Unlimited team members',
      'Dedicated account manager',
      'Custom branding',
      'Enterprise integrations',
    ],
    cta: 'Contact Sales',
    theme: 'enterprise',
  },
];

const PremiumSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="premium-section">
      <div className="premium-container">
        <div className="premium-header">
          <div className="premium-badge">
            <span className="badge-icon">⭐</span> Premium Plans
          </div>
          <h2 className="premium-title">
            Take Your Freelance <span className="premium-highlight">Business to the Next Level</span>
          </h2>
          <p className="premium-description">
            Unlock powerful tools, advanced features, and premium support to grow your freelance business faster than ever before.
          </p>
        </div>

        <div className="premium-toggle-wrapper">
          <div className="premium-toggle">
            <button
              className={`premium-toggle-btn ${!isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`premium-toggle-btn ${isYearly ? 'active' : ''}`}
              onClick={() => setIsYearly(true)}
            >
              Yearly <span className="premium-savings-badge">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="premium-grid">
          {plans.map((plan) => (
            <div className="premium-card" key={plan.name}>
              {plan.popular && <div className="premium-popular-badge">Most Popular</div>}
              <div className="premium-plan-header">
                <div className="premium-icon-wrapper">
                  <span role="img" aria-label="icon">💼</span>
                </div>
                <div className="premium-plan-info">
                  <h3 className="premium-plan-name">{plan.name}</h3>
                  <p className="premium-plan-description">{plan.description}</p>
                </div>
              </div>
              <div className="premium-price-wrapper">
                <span>${isYearly ? plan.priceYearly : plan.priceMonthly}</span>
                <span className="premium-period">/{isYearly ? 'year' : 'month'}</span>
              </div>
              <ul className="premium-features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="premium-feature-item">
                    <Check className="premium-check-icon" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`premium-button ${plan.theme}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="premium-trust">
          <div className="premium-trust-items">
            <div className="premium-trust-item">✅ 30-day money back guarantee</div>
            <div className="premium-trust-item">⭐ 4.9/5 from 10,000+ freelancers</div>
          </div>
          <p className="premium-trust-text">
            Join thousands of successful freelancers who've transformed their business with our platform.
          </p>
        </div>

        <div className="premium-home-wrapper">
          <button onClick={() => navigate('/')} className="premium-home-button">
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
