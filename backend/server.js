const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to local MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fitflex';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to local MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const User = require('./models/User');
const Partner = require('./models/Partner');
const Center = require('./models/Center');

// --- ROUTES ---

// 1. User Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: { name: newUser.name, email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Partner Signup
app.post('/api/partner/signup', async (req, res) => {
  try {
    const { name, facilityName, email, password, city, activity, lat, lng, img } = req.body;
    
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) return res.status(400).json({ error: 'Partner already exists' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Partner
    const newPartner = new Partner({ name, facilityName, email, password: hashedPassword });
    await newPartner.save();
    
    // Create Center
    const newCenter = new Center({
      name: facilityName,
      city: city.toLowerCase(),
      lat,
      lng,
      type: activity,
      img: img || "/images/gym_center_1777294169777.png",
      rating: 5.0,
      distance: (Math.random() * 4.5 + 0.1).toFixed(1)
    });
    await newCenter.save();

    res.status(201).json({ 
      message: 'Partner and facility created successfully', 
      partner: { name: newPartner.name, facilityName: newPartner.facilityName } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 4. Partner Login
app.post('/api/partner/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const partner = await Partner.findOne({ email });
    if (!partner) return res.status(401).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
    res.status(200).json({ 
      message: 'Login successful', 
      partner: { name: partner.name, facilityName: partner.facilityName } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// 5. Get Centers
app.get('/api/centers', async (req, res) => {
  try {
    const { city } = req.query;
    let query = {};
    if (city) {
      query.city = city.toLowerCase();
    }
    const centers = await Center.find(query);
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
