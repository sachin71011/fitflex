import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building, MapPin, Activity, Mail, Lock } from 'lucide-react';
import './Auth.css';

const ACTIVITY_OPTIONS = [
  "Gym", "Swimming", "MMA", "Zumba", "Yoga", 
  "Rock Climbing", "Karate", "Archery", "Boxing", "Pilates"
];

const ACTIVITY_IMAGES = {
  "Gym": "/images/gym_center_1777294169777.png",
  "Swimming": "/images/swimming_pool_1777294185723.png",
  "MMA": "/images/mma_ring_1777294199824.png",
  "Zumba": "/images/zumba_studio_1777294224674.png",
  "Yoga": "/images/yoga_studio_1777301290691.png",
  "Rock Climbing": "/images/rock_climbing_1777301322912.png",
  "Karate": "/images/karate_dojo_1777301259204.png",
  "Archery": "/images/archery_range_1777301273930.png",
  "Boxing": "/images/boxing_ring_1777301307719.png",
  "Pilates": "/images/pilates_studio_1777301985616.png"
};

const INDIAN_CITIES = {
  "mumbai": [19.0760, 72.8777],
  "delhi": [28.7041, 77.1025],
  "bangalore": [12.9716, 77.5946],
  "bengaluru": [12.9716, 77.5946],
  "hyderabad": [17.3850, 78.4867],
  "chennai": [13.0827, 80.2707],
  "kolkata": [22.5726, 88.3639],
  "pune": [18.5204, 73.8567],
  "ahmedabad": [23.0225, 72.5714],
  "jaipur": [26.9124, 75.7873]
};

const PartnerSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    activity: 'Gym',
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const cityKey = formData.city.trim().toLowerCase();
    let baseLat, baseLng;
    if (INDIAN_CITIES[cityKey]) {
      [baseLat, baseLng] = INDIAN_CITIES[cityKey];
    } else {
      [baseLat, baseLng] = [20.5937, 78.9629];
    }
    const offsetLat = (Math.random() - 0.5) * 0.05;
    const offsetLng = (Math.random() - 0.5) * 0.05;

    try {
      const res = await fetch('http://localhost:5000/api/partner/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "Partner", // Default owner name
          facilityName: formData.name,
          email: formData.email,
          password: formData.password,
          city: cityKey,
          activity: formData.activity,
          lat: baseLat + offsetLat,
          lng: baseLng + offsetLng,
          img: ACTIVITY_IMAGES[formData.activity] || ACTIVITY_IMAGES["Gym"]
        })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Registration failed");
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
    <div className="auth-page" style={{minHeight: 'calc(100vh - 80px)'}}>
      <div className="auth-container glass-panel animate-fade-in" style={{maxWidth: '550px'}}>
        <div className="auth-header text-center">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: 'var(--primary-color)' }}>
            <Building size={48} />
          </div>
          <h2>Register Facility</h2>
          <p>Join the FitFlex Partner Network</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          <div className="input-group">
            <label>Facility Name</label>
            <div className="input-with-icon">
              <Building className="input-icon" size={18} />
              <input 
                type="text" 
                name="name"
                placeholder="e.g. Iron Core Gym" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>City</label>
            <div className="input-with-icon">
              <MapPin className="input-icon" size={18} />
              <input 
                type="text" 
                name="city"
                placeholder="e.g. Mumbai, Delhi, Bangalore" 
                value={formData.city}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <div className="input-group">
            <label>Primary Activity</label>
            <div className="input-with-icon">
              <Activity className="input-icon" size={18} />
              <select 
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                required
                style={{
                  width: '100%', 
                  padding: '14px 16px 14px 48px', 
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--text-primary)',
                  appearance: 'none'
                }}
              >
                {ACTIVITY_OPTIONS.map(opt => (
                  <option key={opt} value={opt} style={{background: '#111'}}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Business Email</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                name="email"
                placeholder="partner@facility.com" 
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg mt-4">Complete Registration</button>
        </form>

        <div className="auth-footer text-center">
          <p>Already a partner? <Link to="/partner-login">Login Here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignup;
