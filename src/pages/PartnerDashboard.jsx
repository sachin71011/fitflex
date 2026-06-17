import React, { useState, useEffect } from 'react';
import { Users, IndianRupee, Activity, Star, TrendingUp, Clock } from 'lucide-react';
import './PartnerDashboard.css';

const PartnerDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="partner-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <h2 className="text-gradient">Loading Partner Analytics...</h2>
      </div>
    );
  }

  const weeklyData = [
    { day: 'Mon', value: 45, height: '45%' },
    { day: 'Tue', value: 60, height: '60%' },
    { day: 'Wed', value: 55, height: '55%' },
    { day: 'Thu', value: 85, height: '85%' },
    { day: 'Fri', value: 95, height: '95%' },
    { day: 'Sat', value: 120, height: '100%' },
    { day: 'Sun', value: 110, height: '90%' },
  ];

  const partnerName = localStorage.getItem('fitflex_current_partner_name') || "Elite Iron Gym";

  return (
    <div className="partner-dashboard animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1>Partner Dashboard</h1>
          <p>Welcome back, {partnerName}</p>
        </div>
        <select className="date-filter">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Visits</h3>
            <div className="stat-value">1,284</div>
            <div className="stat-trend trend-up">
              <TrendingUp size={14} /> +12% from last month
            </div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: '#7000ff', background: 'rgba(112, 0, 255, 0.1)'}}>
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <h3>Revenue Share</h3>
            <div className="stat-value">₹1,45,600</div>
            <div className="stat-trend trend-up">
              <TrendingUp size={14} /> +8% from last month
            </div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: '#ffaa00', background: 'rgba(255, 170, 0, 0.1)'}}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Live Check-ins</h3>
            <div className="stat-value">24</div>
            <div className="stat-trend">
              Currently working out
            </div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon" style={{color: '#00ccff', background: 'rgba(0, 204, 255, 0.1)'}}>
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h3>Average Rating</h3>
            <div className="stat-value">4.8/5</div>
            <div className="stat-trend">
              Based on 342 reviews
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="chart-section glass-panel">
          <h3>Weekly Attendance</h3>
          <div className="mock-chart">
            {weeklyData.map((data, index) => (
              <div className="bar-wrapper" key={index}>
                <div className="bar" style={{height: data.height}} data-value={data.value}></div>
                <div className="bar-label">{data.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="activity-section glass-panel">
          <h3>Recent Check-ins</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="user-info">
                <div className="user-avatar">AS</div>
                <div className="user-details">
                  <h4>Arjun Sharma</h4>
                  <p>Pro Plan</p>
                </div>
              </div>
              <div className="activity-meta text-right">
                <div className="activity-status">Active</div>
                <div className="activity-time"><Clock size={12} style={{display: 'inline', marginRight: '4px'}}/>10 mins ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="user-info">
                <div className="user-avatar">PM</div>
                <div className="user-details">
                  <h4>Priya Patel</h4>
                  <p>Standard Plan</p>
                </div>
              </div>
              <div className="activity-meta text-right">
                <div className="activity-status">Active</div>
                <div className="activity-time"><Clock size={12} style={{display: 'inline', marginRight: '4px'}}/>25 mins ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="user-info">
                <div className="user-avatar">RK</div>
                <div className="user-details">
                  <h4>Rahul Kumar</h4>
                  <p>Pro Plan</p>
                </div>
              </div>
              <div className="activity-meta text-right">
                <div className="activity-time">Completed</div>
                <div className="activity-time"><Clock size={12} style={{display: 'inline', marginRight: '4px'}}/>1 hr ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="user-info">
                <div className="user-avatar">NV</div>
                <div className="user-details">
                  <h4>Neha Verma</h4>
                  <p>Trial Pass</p>
                </div>
              </div>
              <div className="activity-meta text-right">
                <div className="activity-time">Completed</div>
                <div className="activity-time"><Clock size={12} style={{display: 'inline', marginRight: '4px'}}/>2 hrs ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
