import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }
      localStorage.setItem('fitflex_current_user', data.user.name);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container glass-panel animate-fade-in">
        <div className="auth-header text-center">
          <h2>Join FitFlex</h2>
          <p>Start your limitless fitness journey today</p>
        </div>

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">Sign Up</button>
        </form>

        <div className="auth-footer text-center">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
