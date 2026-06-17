import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Building } from 'lucide-react';
import './Auth.css';

const PartnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Invalid email or password");
        return;
      }
      localStorage.setItem('fitflex_current_partner_name', data.partner.facilityName);
      navigate('/partner-dashboard');
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-panel animate-fade-in">
        <div className="auth-header text-center">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
            <Building size={48} />
          </div>
          <h2>Partner Portal</h2>
          <p>Manage your fitness center</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label>Business Email</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="partner@gym.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="auth-actions">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg mt-4">Login to Dashboard</button>
        </form>

        <div className="auth-footer text-center">
          <p>Want to partner with FitFlex? <Link to="/partner-signup">Apply Here</Link></p>
          <p className="mt-2"><Link to="/login" style={{color: 'var(--text-secondary)', fontSize: '0.85rem'}}>Return to User Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;
