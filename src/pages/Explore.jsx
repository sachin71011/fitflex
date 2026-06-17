import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Search, MapPin, Star } from 'lucide-react';
import './Explore.css';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icon for Fitness Centers
const gymIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when location is found
function LocationMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { animate: true });
    }
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
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

const Explore = () => {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCustomCenters = async (city = "") => {
    try {
      const url = city ? `http://localhost:5000/api/centers?city=${city}` : `http://localhost:5000/api/centers`;
      const res = await fetch(url);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error("Failed to fetch centers from backend", e);
    }
    return [];
  };

  const handleSearch = async () => {
    const query = searchQuery.trim().toLowerCase();
    if (INDIAN_CITIES[query]) {
      setLoading(true);
      const coords = INDIAN_CITIES[query];
      setPosition(coords);
      
      const customCenters = await fetchCustomCenters(query);
      const dummyCenters = generateDummyCenters(coords[0], coords[1], query);
      setCenters([...customCenters, ...dummyCenters]);
      setLoading(false);
    } else if (query !== "") {
      alert("City not found in our database. Try Mumbai, Delhi, Bangalore, Chennai, etc.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Generate some dummy centers around the user's location
  const generateDummyCenters = (lat, lng, city = "") => {
    const prefix = city ? city.charAt(0).toUpperCase() + city.slice(1) + " " : "";
    const suffix = city ? " " + city.charAt(0).toUpperCase() + city.slice(1) : "";

    const defaultCenters = [
      { id: 1, name: `${prefix}Elite Iron Gym`, lat: lat + 0.01, lng: lng + 0.01, type: "Gym", img: "/images/gym_center_1777294169777.png", rating: 4.8 },
      { id: 2, name: `Aqua Blue Pool${suffix}`, lat: lat - 0.01, lng: lng + 0.02, type: "Swimming", img: "/images/swimming_pool_1777294185723.png", rating: 4.5 },
      { id: 3, name: `Combat Strike MMA${suffix}`, lat: lat + 0.02, lng: lng - 0.01, type: "MMA", img: "/images/mma_ring_1777294199824.png", rating: 4.9 },
      { id: 4, name: `${prefix}Rhythm Zumba Studio`, lat: lat - 0.015, lng: lng - 0.015, type: "Zumba", img: "/images/zumba_studio_1777294224674.png", rating: 4.6 },
      { id: 5, name: `Zen Yoga Space${suffix}`, lat: lat + 0.015, lng: lng + 0.005, type: "Yoga", img: "/images/yoga_studio_1777301290691.png", rating: 4.7 },
      { id: 6, name: `${prefix}Apex Rock Climbing`, lat: lat - 0.005, lng: lng + 0.015, type: "Rock Climbing", img: "/images/rock_climbing_1777301322912.png", rating: 4.8 },
      { id: 7, name: `Dragon Karate Dojo${suffix}`, lat: lat + 0.008, lng: lng - 0.012, type: "Karate", img: "/images/karate_dojo_1777301259204.png", rating: 4.4 },
      { id: 8, name: `${prefix}Precision Archery Range`, lat: lat - 0.02, lng: lng + 0.008, type: "Archery", img: "/images/archery_range_1777301273930.png", rating: 4.5 },
      { id: 9, name: `Knockout Boxing Club${suffix}`, lat: lat + 0.025, lng: lng + 0.02, type: "Boxing", img: "/images/boxing_ring_1777301307719.png", rating: 4.7 },
      { id: 10, name: `${prefix}Core Flow Pilates`, lat: lat - 0.025, lng: lng - 0.02, type: "Pilates", img: "/images/pilates_studio_1777301985616.png", rating: 4.9 }
    ];

    return defaultCenters.map(center => ({
      ...center,
      distance: center.distance || (Math.random() * 4.5 + 0.1).toFixed(1)
    }));
  };

  const locateUser = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          const customCenters = await fetchCustomCenters();
          const dummyCenters = generateDummyCenters(latitude, longitude);
          setCenters([...customCenters, ...dummyCenters]);
          setLoading(false);
        },
        async (err) => {
          console.error("Error getting location", err);
          // Fallback to New York center
          const fallbackPos = [40.7128, -74.0060];
          setPosition(fallbackPos);
          const customCenters = await fetchCustomCenters();
          const dummyCenters = generateDummyCenters(fallbackPos[0], fallbackPos[1]);
          setCenters([...customCenters, ...dummyCenters]);
          setLoading(false);
          alert("Could not access location. Showing default area.");
        }
      );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    locateUser();
  }, []);

  return (
    <div className="explore-page">
      <div className="explore-sidebar glass-panel">
        <h2 className="heading-lg" style={{fontSize: '2rem'}}>Find Centers</h2>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search city (e.g. Mumbai, Delhi)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary search-btn" onClick={handleSearch}><Search size={20} /></button>
        </div>

        <button className="btn btn-outline w-100" onClick={locateUser} style={{marginBottom: '24px'}}>
          <Navigation size={18} /> Use My Current Location
        </button>

        <div className="centers-list">
          {loading ? (
            <p className="loading-text">Finding nearby centers...</p>
          ) : (
            centers.map(center => (
              <div key={center.id} className="center-card">
                <img src={center.img} alt={center.name} className="center-img" />
                <div className="center-info">
                  <h4>{center.name}</h4>
                  <p className="center-type">{center.type}</p>
                  <p className="center-distance"><MapPin size={14}/> ~{center.distance} miles away</p>
                  <div className="center-rating" style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb400', fontSize: '0.85rem', marginTop: '4px'}}>
                    <Star size={14} fill="#ffb400" /> 
                    <span>{center.rating ? center.rating.toFixed(1) : '5.0'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="map-container">
        {position ? (
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              className="map-tiles"
            />
            <LocationMarker position={position} />
            
            {centers.map(center => (
              <Marker key={center.id} position={[center.lat, center.lng]} icon={gymIcon}>
                <Popup>
                  <div className="map-popup">
                    <img src={center.img} alt={center.name} style={{width: '100%', height: '80px', objectFit: 'cover', borderRadius: '8px'}}/>
                    <h4 style={{margin: '8px 0 4px', color: '#000'}}>{center.name}</h4>
                    <p style={{margin: '0', color: '#666'}}>{center.type}</p>
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb400', fontSize: '0.85rem', marginTop: '4px', marginBottom: '4px'}}>
                      <Star size={14} fill="#ffb400" /> 
                      <span style={{color: '#000', fontWeight: 'bold'}}>{center.rating ? center.rating.toFixed(1) : '5.0'}</span>
                    </div>
                    <button className="btn btn-primary btn-sm mt-2" style={{width: '100%', padding: '4px 8px', fontSize: '0.8rem'}}>View Details</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        ) : (
          <div className="map-loading">Loading Map...</div>
        )}
      </div>
    </div>
  );
};

export default Explore;
