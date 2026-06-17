import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Home.css'; // Reusing Home styles for the pricing grid

const Plans = () => {
  return (
    <div className="plans-page animate-fade-in" style={{ paddingTop: '60px', paddingBottom: '80px', minHeight: 'calc(100vh - 150px)' }}>
      <section className="pricing container">
        <Link to="/dashboard" className="btn btn-outline" style={{ marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div className="section-header text-center">
          <h2 className="heading-lg">Choose Your Plan</h2>
          <p>Select a subscription tier that fits your ultimate fitness goals.</p>
        </div>

        <div className="pricing-grid mt-4">
          <div className="price-card glass-panel">
            <div className="plan-name">Monthly</div>
            <div className="price"><span>₹</span>2999<span>/mo</span></div>
            <ul className="plan-features">
              <li>Access to all standard gyms</li>
              <li>2 premium classes/month</li>
              <li>Cancel anytime</li>
            </ul>
            <Link to="/payment" state={{ planName: 'Monthly', price: 2999, monthlyPrice: 2999 }} className="btn btn-outline w-100">Select Plan</Link>
          </div>

          <div className="price-card glass-panel popular">
            <div className="popular-badge">Most Popular</div>
            <div className="plan-name">Quarterly</div>
            <div className="price"><span>₹</span>2499<span>/mo</span></div>
            <div className="billed">Billed ₹7497 quarterly</div>
            <ul className="plan-features">
              <li>Access to all facilities</li>
              <li>10 premium classes/month</li>
              <li>Priority booking</li>
            </ul>
            <Link to="/payment" state={{ planName: 'Quarterly', price: 5997, monthlyPrice: 1999 }} className="btn btn-primary w-100">Select Plan</Link>
          </div>

          <div className="price-card glass-panel">
            <div className="plan-name">Yearly</div>
            <div className="price"><span>₹</span>1999<span>/mo</span></div>
            <div className="billed">Billed ₹23988 yearly</div>
            <ul className="plan-features">
              <li>Unlimited access everywhere</li>
              <li>Unlimited premium classes</li>
              <li>Free guest pass (1/mo)</li>
            </ul>
            <Link to="/payment" state={{ planName: 'Yearly', price: 23988, monthlyPrice: 1999 }} className="btn btn-outline w-100">Select Plan</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;
