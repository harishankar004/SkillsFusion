import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown, Plus, MessageCircle, Book } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setUserEmail(localStorage.getItem('userEmail') || '');
      setUserRole(localStorage.getItem('userRole') || '');
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail('');
    setUserRole('');
    setShowUserMenu(false);
    window.dispatchEvent(new Event('authStateChanged'));
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const handleCreateProjectClick = () => {
    navigate('/clientpro');
    setShowUserMenu(false);
  };

  const handleChatListClick = () => {
    navigate('/chatlist');
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar sf-navbar">
      {/* Logo */}
      <div className="navbar-left">
        <h2 className="navbar-logo" onClick={() => navigate('/')}>
          SkillsFusion<span className="dot">.</span>
        </h2>
      </div>

      {/* Center Nav */}
      <div className="navbar-middle">
        <ul className="nav-links">
          <li>
            <button onClick={() => navigate('/premium')} className="nav-button">
              {t('fusionPro')}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/explore')} className="nav-button">
              {t('explore')}
            </button>
          </li>

          <li
            className="lang-dropdown"
            onMouseEnter={() => setShowLangMenu(true)}
            onMouseLeave={() => setShowLangMenu(false)}
          >
            🌐 {i18n.language.toUpperCase()}
            <ul className={`lang-menu ${showLangMenu ? 'show' : ''}`}>
              {['en', 'fr', 'de', 'es', 'pt'].map((lng) => (
                <li key={lng} onClick={() => changeLanguage(lng)} className="lang-item">
                  {{
                    en: 'English',
                    fr: 'Français',
                    de: 'Deutsch',
                    es: 'Español',
                    pt: 'Português',
                  }[lng]}
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Right Auth Buttons */}
        <div className="navbar-right">
          {isAuthenticated ? (
            <div className="user-dropdown-container">
              <div className="user-trigger" onClick={() => setShowUserMenu(!showUserMenu)}>
                <User size={18} />
                <span style={{ color: '#1dbf73' }}>{userEmail.split('@')[0]}</span>
                <ChevronDown size={16} />
              </div>

              {showUserMenu && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-item" onClick={handleProfileClick}>
                    <User size={16} />
                    <span>Profile</span>
                  </div>

                  {/* ✅ CLIENT-only items */}
                  {userRole === 'CLIENT' && (
                    <>
                      <div className="dropdown-item" onClick={handleCreateProjectClick}>
                        <Plus size={16} />
                        <span>Add Project</span>
                      </div>
                      <div className="dropdown-item" onClick={() => { navigate('/myprojects'); setShowUserMenu(false); }}>
                        <Book size={16} color="#000" />
                        <span>My Projects</span>
                      </div>
                    </>
                  )}

                  <div className="dropdown-item" onClick={handleChatListClick}>
                    <MessageCircle size={16} />
                    <span>Chat</span>
                  </div>

                  <div className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="login-btn">
                {t('login')}
              </button>
              <button onClick={() => navigate('/signup')} className="signup-btn">
                {t('signup')}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
