import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Menu, X, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check login status
  const currentUser = localStorage.getItem('fitflex_current_user');
  const currentPartner = localStorage.getItem('fitflex_current_partner_name');
  const isLoggedIn = !!(currentUser || currentPartner);
  const dashboardLink = currentPartner ? '/partner-dashboard' : '/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('fitflex_current_user');
    localStorage.removeItem('fitflex_current_partner_name');
    closeMenu();
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <Dumbbell className="logo-icon" size={32} />
          <span>Fit<span className="text-gradient">Flex</span></span>
        </Link>

        <div className="menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className={`nav-links ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/explore" className={`nav-links ${location.pathname === '/explore' ? 'active' : ''}`} onClick={closeMenu}>
              Explore Centers
            </Link>
          </li>
          
          {isLoggedIn && (
            <li className="nav-item">
              <Link to={dashboardLink} className={`nav-links ${location.pathname === dashboardLink ? 'active' : ''}`} onClick={closeMenu}>
                Dashboard
              </Link>
            </li>
          )}

          <li className="nav-item nav-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>Login</Link>
                <Link to="/signup" className="btn btn-primary" onClick={closeMenu}>Join Now</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn btn-outline logout-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LogOut size={18} /> Logout
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
