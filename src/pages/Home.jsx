import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Activity, CreditCard, Shield } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [showAllVenues, setShowAllVenues] = useState(false);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url('/images/hero_bg_1777294151852.png')` }}></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="heading-xl animate-fade-in">
            One Pass.<br />
            <span className="text-gradient">Limitless Fitness.</span>
          </h1>
          <p className="hero-subtitle animate-fade-in delay-1">
            Why stick to one gym? Access premium fitness centers, swimming pools, MMA studios, and Zumba classes across your city with a single FitFlex subscription.
          </p>
          <div className="hero-cta animate-fade-in delay-2">
            <Link to="/explore" className="btn btn-primary btn-lg">
              Find Nearby Centers <MapPin size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="section-header">
          <h2 className="heading-lg">Why Choose Fit<span className="text-gradient">Flex</span>?</h2>
          <p>Break the boredom. Discover a new way to train every day.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Activity size={32} /></div>
            <h3>Unlimited Variety</h3>
            <p>From powerlifting to peaceful yoga, mix up your routine and never hit a plateau.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><MapPin size={32} /></div>
            <h3>Anywhere, Anytime</h3>
            <p>Traveling across town? Find a partner facility near you instantly with our geolocation map.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><CreditCard size={32} /></div>
            <h3>Flexible Memberships</h3>
            <p>Monthly, quarterly, or yearly. Pay for what you use, without long-term locks.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon"><Shield size={32} /></div>
            <h3>Premium Quality</h3>
            <p>We only partner with top-tier fitness centers to ensure you get the best equipment and hygiene.</p>
          </div>
        </div>
      </section>

      {/* Venues Showcase */}
      <section className="venues">
        <div className="container">
          <h2 className="heading-lg text-center" style={{ marginBottom: '40px' }}>Access Premium Facilities</h2>
          <div className="venues-gallery">
            <div className="venue-card">
              <img src="/images/gym_center_1777294169777.png" alt="Gym" />
              <div className="venue-info glass-panel">
                <h4>Elite Gyms</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/swimming_pool_1777294185723.png" alt="Swimming Pool" />
              <div className="venue-info glass-panel">
                <h4>Olympic Pools</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/mma_ring_1777294199824.png" alt="MMA" />
              <div className="venue-info glass-panel">
                <h4>MMA Studios</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/zumba_studio_1777294224674.png" alt="Zumba" />
              <div className="venue-info glass-panel">
                <h4>Dance & Zumba</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/yoga_studio_1777301290691.png" alt="Yoga" />
              <div className="venue-info glass-panel">
                <h4>Yoga Studios</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/rock_climbing_1777301322912.png" alt="Rock Climbing" />
              <div className="venue-info glass-panel">
                <h4>Rock Climbing</h4>
              </div>
            </div>
            <div className="venue-card">
              <img src="/images/karate_dojo_1777301259204.png" alt="Karate" />
              <div className="venue-info glass-panel">
                <h4>Karate Dojos</h4>
              </div>
            </div>
            {showAllVenues && (
              <>
                <div className="venue-card animate-fade-in">
                  <img src="/images/archery_range_1777301273930.png" alt="Archery" />
                  <div className="venue-info glass-panel">
                    <h4>Archery Ranges</h4>
                  </div>
                </div>
                <div className="venue-card animate-fade-in delay-1">
                  <img src="/images/boxing_ring_1777301307719.png" alt="Boxing" />
                  <div className="venue-info glass-panel">
                    <h4>Boxing Clubs</h4>
                  </div>
                </div>
                <div className="venue-card animate-fade-in delay-2">
                  <img src="/images/pilates_studio_1777301985616.png" alt="Pilates" />
                  <div className="venue-info glass-panel">
                    <h4>Pilates Studios</h4>
                  </div>
                </div>
              </>
            )}
            {!showAllVenues ? (
              <div onClick={() => setShowAllVenues(true)} className="venue-card more-card glass-panel" style={{ cursor: 'pointer' }}>
                <div className="more-content">
                  <h4>Show More</h4>
                  <p>+ Archery, Boxing & more</p>
                  <div className="more-icon"><ArrowRight size={28} /></div>
                </div>
              </div>
            ) : (
              <div onClick={() => setShowAllVenues(false)} className="venue-card more-card glass-panel" style={{ cursor: 'pointer' }}>
                <div className="more-content">
                  <h4>Show Less</h4>
                  <p>- Collapse list</p>
                  <div className="more-icon"><ArrowLeft size={28} /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing container">
        <div className="section-header text-center">
          <h2 className="heading-lg">Choose Your Plan</h2>
          <p>Simple, transparent pricing for ultimate flexibility.</p>
        </div>

        <div className="pricing-grid">
          <div className="price-card glass-panel">
            <div className="plan-name">Monthly</div>
            <div className="price"><span>₹</span>2999<span>/mo</span></div>
            <ul className="plan-features">
              <li>Access to all standard gyms</li>
              <li>2 premium classes/month</li>
              <li>Cancel anytime</li>
            </ul>
            <Link to="/signup" className="btn btn-outline w-100">Get Started</Link>
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
            <Link to="/signup" className="btn btn-primary w-100">Get Started</Link>
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
            <Link to="/signup" className="btn btn-outline w-100">Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
