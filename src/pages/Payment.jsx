import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Shield, CreditCard, Smartphone } from 'lucide-react';
import './Payment.css';

const Payment = () => {
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const planDetails = location.state || { planName: 'Quarterly', price: 5997, monthlyPrice: 1999 };
  const { planName, price, monthlyPrice } = planDetails;

  const handlePayment = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);
  };

  if (success) {
    return (
      <div className="payment-page container text-center">
        <div className="success-message glass-panel animate-fade-in">
          <CheckCircle size={80} color="var(--primary-color)" className="mx-auto mb-4" />
          <h2>Payment Successful!</h2>
          <p>Welcome to FitFlex. Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page container">
      <div className="payment-grid animate-fade-in">
        <div className="payment-form-section glass-panel">
          <h2 className="mb-4">Complete your subscription</h2>
          
          <div className="payment-methods mb-4">
            <button className="method-btn active"><CreditCard size={20} /> Card</button>
            <button className="method-btn"><Smartphone size={20} /> Apple Pay</button>
          </div>

          <form onSubmit={handlePayment}>
            <div className="input-group">
              <label>Cardholder Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>

            <div className="input-group">
              <label>Card Number</label>
              <div className="card-input-wrapper">
                <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                <CreditCard size={20} className="card-icon" />
              </div>
            </div>

            <div className="payment-row">
              <div className="input-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" maxLength="5" required />
              </div>
              <div className="input-group">
                <label>CVC</label>
                <input type="text" placeholder="123" maxLength="3" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4 btn-lg">Pay ₹{price}.00</button>
            <p className="secure-badge mt-3 text-center"><Shield size={14} /> Secure Encrypted Transaction</p>
          </form>
        </div>

        <div className="order-summary glass-panel">
          <h3 className="mb-4">Order Summary</h3>
          <div className="summary-item">
            <span>{planName} Plan</span>
            <span>₹{monthlyPrice}.00/mo</span>
          </div>
          <div className="summary-item text-secondary">
            <span>Billed {planName}</span>
            <span>₹{price}.00</span>
          </div>
          <hr className="my-4" />
          <div className="summary-item total">
            <span>Total due today</span>
            <span>₹{price}.00</span>
          </div>
          <ul className="plan-features-list mt-4">
            <li><CheckCircle size={16} /> Access to all facilities</li>
            <li><CheckCircle size={16} /> 10 premium classes/month</li>
            <li><CheckCircle size={16} /> Priority booking</li>
            <li><CheckCircle size={16} /> Cancel anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
