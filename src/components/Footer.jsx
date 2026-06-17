import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Globe, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <Link to="/" className="logo footer-logo">
            <Dumbbell className="logo-icon" size={28} />
            <span>Fit<span className="text-gradient">Flex</span></span>
          </Link>
          <p className="footer-desc">
            Your city, your gym. Subscribe once, train anywhere. The ultimate fitness passport for the modern athlete.
          </p>
          <div className="social-icons">
            <a href="#" aria-label="Website"><Globe size={20} /></a>
            <a href="#" aria-label="Phone"><Phone size={20} /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/explore">Find Centers</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">Features</Link></li>
            <li><Link to="/">Classes</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/partner-login" style={{color: 'var(--primary-color)'}}>Partner Portal</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe to get the latest fitness news and offers.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Your Email" />
            <button className="btn btn-primary"><Mail size={18} /></button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FitFlex. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
