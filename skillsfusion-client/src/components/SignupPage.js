import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './FreelanceAuthPages.css';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: 'FREELANCER',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    if (password.length < 8) return 'Weak';
    const hasNumber = /[0-9]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[@$!%*#?&]/.test(password);

    if (hasNumber && hasLower && hasUpper && hasSpecial) return 'Strong';
    if ((hasNumber || hasSpecial) && hasLower) return 'Medium';
    return 'Weak';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'password') {
      const strength = getPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email)) newErrors.email = 'Use format like abc123@gmail.com';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const url = 'http://localhost:8081/api/auth/signup';
    const payload = {
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      role: formData.userType,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.text();

      if (res.ok) {
        localStorage.setItem('firstName', formData.firstName);
        localStorage.setItem('lastName', formData.lastName);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userType', formData.userType.toUpperCase());
        localStorage.setItem('isAuthenticated', 'true');

        window.dispatchEvent(new Event('authStateChanged'));
        setShowSuccessPopup(true);
      } else {
        alert(data);
      }
    } catch (err) {
      alert('Server not reachable.');
      console.error(err);
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate('/login');
  };

  const SuccessPopup = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '30px', maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)', animation: 'popupSlideIn 0.3s ease-out' }}>
        <div style={{ width: '60px', height: '60px', backgroundColor: '#4CAF50', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', color: 'white' }}>✓</div>
        <h2 style={{ color: '#333', marginBottom: '15px', fontSize: '24px', fontWeight: '600' }}>Registration Successful!</h2>
        <p style={{ color: '#666', marginBottom: '25px', fontSize: '16px', lineHeight: '1.5' }}>
          Welcome to SkillsFusion, {formData.firstName}! Your account has been created successfully.
        </p>
        <button onClick={handlePopupClose} style={{ backgroundColor: '#00c6ff', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 30px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s ease', width: '100%' }} onMouseOver={(e) => (e.target.style.backgroundColor = '#0099cc')} onMouseOut={(e) => (e.target.style.backgroundColor = '#00c6ff')}>
          Continue to Login
        </button>
      </div>
      <style>{`
        @keyframes popupSlideIn {
          0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );

  return (
    <div className="container">
      <div className="grid">
        <div className="branding">
          <h1>SkillsFusion</h1>
          <p>Connect. Create. Collaborate.</p>
        </div>
        <div className="card">
          <h2 style={{ fontFamily: 'Cambria' }}>Join SkillsFusion</h2>
          <p>Create your account</p>
          <div className="input-field">
            <label>First Name</label>
            <input name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className={errors.firstName ? 'error' : ''} />
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}

            <label>Last Name</label>
            <input name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className={errors.lastName ? 'error' : ''} />
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}

            <label>User Type</label>
            <div className="checkbox-group">
              <label>
                <input type="radio" name="userType" value="FREELANCER" checked={formData.userType === 'FREELANCER'} onChange={handleInputChange} /> Freelancer
              </label>
              <label style={{ marginLeft: '20px' }}>
                <input type="radio" name="userType" value="CLIENT" checked={formData.userType === 'CLIENT'} onChange={handleInputChange} /> Client
              </label>
            </div>

            <label>Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="abc123@gmail.com" className={errors.email ? 'error' : ''} />
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label>Password</label>
            <div className="password-field">
              <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} placeholder="Enter password" className={errors.password ? 'error' : ''} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {passwordStrength && (
              <p style={{ color: passwordStrength === 'Strong' ? 'green' : passwordStrength === 'Medium' ? 'orange' : 'red' }}>
                Password Strength: {passwordStrength}
              </p>
            )}
            {errors.password && <p className="error-message">{errors.password}</p>}

            <label>Confirm Password</label>
            <div className="password-field">
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm password" className={errors.confirmPassword ? 'error' : ''} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

            <div className="button" onClick={handleSubmit}>Create Account</div>
            <div className="toggle-mode">
              <p>
                Already have an account?
                <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#00c6ff', fontWeight: 'bold', cursor: 'pointer' }}>
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default SignupPage;