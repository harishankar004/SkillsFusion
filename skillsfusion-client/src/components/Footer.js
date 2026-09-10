import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Heart,
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="about-section">
            <h3 className="about-title">SkillsFusion</h3>
            <p className="about-description">
              Full-stack developer and designer creating digital solutions that
              drive results. Specializing in modern web technologies and
              user-centered design.
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/hemanth-meher-386703287/"
                className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/harishankar004"
                className="bg-gray-800 p-3 rounded-full hover:bg-gray-600 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="service-title">Services</h4>
            <ul className="service-list">
              <li><a href="#web-development">Web Development</a></li>
              <li><a href="#ui-design">UI/UX Design</a></li>
              <li><a href="#mobile-apps">Mobile Apps</a></li>
              <li><a href="#consulting">Consulting</a></li>
              <li><a href="#maintenance">Maintenance</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="contact-title">Get In Touch</h4>
            <div className="contact-info">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-blue-400" />
                <a href="mailto:skillsfusion01@gmail.com">skillsfusion01@gmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400" />
                <a href="tel:+917671888674">+91 7671888674</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-blue-400" />
                <span>Tadepalligudem, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="bottom-bar-text">
              <span>© {currentYear} SkillsFusion. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-2 bottom-bar-text">
              <span>Made with </span>
              <Heart size={16} className="bottom-bar-heart" />
              <span> and lots of coffee</span>
            </div>
            <div className="bottom-bar-links">
              <a href="/privacy" className="bottom-bar-text">
                Privacy Policy
              </a>
              <a href="/terms" className="bottom-bar-text">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
