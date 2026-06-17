import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Activity, Award, CreditCard } from 'lucide-react';
import FlexAI from '../components/FlexAI';
import './Dashboard.css';

const Dashboard = () => {
  const userName = localStorage.getItem('fitflex_current_user') || "Alex";

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header animate-fade-in">
        <div>
          <h2 className="heading-lg">Welcome back, <span className="text-gradient">{userName}</span></h2>
          <p>Here's your fitness overview for this month.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="subscription-badge glass-panel" style={{ margin: 0 }}>
            <Award size={24} color="var(--primary-color)" />
            <div>
              <div className="badge-title">Pro Tier</div>
              <div className="badge-status">Active until 28th of June</div>
            </div>
          </div>
          <Link to="/plans" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} /> Manage Payment
          </Link>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-col-left">

          <div className="stats-cards animate-fade-in delay-1">
            <div className="stat-card glass-panel">
              <Activity className="stat-icon" />
              <div className="stat-value">12</div>
              <div className="stat-label">Workouts this month</div>
            </div>
            <div className="stat-card glass-panel">
              <Clock className="stat-icon" />
              <div className="stat-value">18h</div>
              <div className="stat-label">Total Time</div>
            </div>
            <div className="stat-card glass-panel">
              <MapPin className="stat-icon" />
              <div className="stat-value">4</div>
              <div className="stat-label">Centers Visited</div>
            </div>
          </div>

          <div className="recent-activity glass-panel animate-fade-in delay-2">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li className="activity-item">
                <div className="activity-icon bg-blue"><Activity size={18} /></div>
                <div className="activity-details">
                  <h4>Elite Iron Gym</h4>
                  <p>Strength Training • 1.5 hours</p>
                </div>
                <div className="activity-date">Today</div>
              </li>
              <li className="activity-item">
                <div className="activity-icon bg-purple"><Activity size={18} /></div>
                <div className="activity-details">
                  <h4>Aqua Blue Pool</h4>
                  <p>Swimming laps • 45 mins</p>
                </div>
                <div className="activity-date">2 days ago</div>
              </li>
              <li className="activity-item">
                <div className="activity-icon bg-orange"><Activity size={18} /></div>
                <div className="activity-details">
                  <h4>Rhythm Zumba Studio</h4>
                  <p>Cardio Dance • 1 hour</p>
                </div>
                <div className="activity-date">5 days ago</div>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column */}
        <div className="dashboard-col-right animate-fade-in delay-3">
          <div className="qr-pass glass-panel text-center">
            <h3>Your FitFlex Pass</h3>
            <p className="mb-3">Show this QR code at any partner center</p>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', display: 'inline-block', marginBottom: '16px' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FitFlex-Demo-Pass" alt="FitFlex QR Pass" style={{ display: 'block' }} />
            </div>
            <p className="qr-id">ID: FF-2938-4821</p>
          </div>

          <div className="upcoming-classes glass-panel mt-4">
            <h3>Upcoming Bookings</h3>
            <div className="booking-card">
              <div className="booking-date">
                <span className="month">APR</span>
                <span className="day">28</span>
              </div>
              <div className="booking-info">
                <h4>HIIT Bootcamp</h4>
                <p><MapPin size={12} /> Combat Strike MMA</p>
                <p><Clock size={12} /> 18:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FlexAI />
    </div>
  );
};

export default Dashboard;
