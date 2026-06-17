import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Payment from './pages/Payment';
import PartnerLogin from './pages/PartnerLogin';
import PartnerSignup from './pages/PartnerSignup';
import PartnerDashboard from './pages/PartnerDashboard';
import Plans from './pages/Plans';

function App() {
  return (
    <Router>
      <div className="page-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/partner-login" element={<PartnerLogin />} />
            <Route path="/partner-signup" element={<PartnerSignup />} />
            <Route path="/partner-dashboard" element={<PartnerDashboard />} />
            <Route path="/plans" element={<Plans />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
