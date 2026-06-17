# 🏋️‍♂️ FitFlex — One Pass. Limitless Fitness.

FitFlex is a premium, full-stack fitness subscription platform that allows users to access premium fitness centers, swimming pools, MMA studios, yoga hubs, and Zumba classes across their city using a single subscription pass. It features a modern, responsive dark-themed UI/UX, interactive location mapping, secure authentication, and specialized user and partner dashboards.

---

## 🚀 Key Features

* **Single Membership Pass**: Unified subscription plans (Monthly, Quarterly, Yearly) for access to diverse fitness centers.
* **Interactive Map & Search**: Built-in interactive map (powered by Leaflet) to locate, filter, and explore gym and wellness centers by city.
* **Dual Dashboards**:
  * **User Dashboard**: Track active subscriptions, view upcoming bookings, and explore check-in history.
  * **Partner Dashboard**: Fitness center owners can manage their listings, monitor check-ins, and track revenue.
* **Secure Authentication**: Backend user & partner registration and login powered by Express and password hashing with `bcryptjs`.
* **Dynamic Location Mapping**: Partners can input coordinates (latitude/longitude) during registration to add their facility directly onto the interactive map.

---

## 🛠️ Tech Stack

### Frontend
* **Core**: React 19, HTML5, Vanilla CSS (with modern gradients and glassmorphism)
* **Build Tool**: Vite
* **Routing**: React Router DOM
* **Maps**: React Leaflet & Leaflet
* **Icons**: Lucide React

### Backend
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (via Mongoose ODM)
* **Security**: bcryptjs for secure password hashing
* **Environment Management**: dotenv

---

## 📦 Project Directory Structure

```text
fitflex/
├── backend/                  # Express.js Server
│   ├── models/               # MongoDB Mongoose Schemas (User, Partner, Center)
│   ├── server.js             # Main server entrypoint
│   └── package.json
│
├── src/                      # React Frontend
│   ├── assets/               # Local static assets & images
│   ├── components/           # Reusable UI components (Navbar, Footer, FlexAI)
│   ├── pages/                # Page components (Home, Explore, Dashboards, Auth)
│   ├── App.jsx               # App container & routes
│   └── main.jsx              # Client entrypoint
│
├── public/                   # Public assets (images, icons)
├── package.json              # Frontend dependencies & scripts
└── vite.config.js            # Vite configuration
```

---

## ⚙️ Getting Started

Follow these steps to set up and run the application locally on your machine.

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **MongoDB** (Ensure local MongoDB service is running at `mongodb://127.0.0.1:27017/`)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sachin71011/fitflex.git
   cd fitflex
   ```

2. **Set up the Backend**
   Navigate to the backend directory, install dependencies, and start the server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *The backend will run on `http://localhost:5000`.*

3. **Set up the Frontend**
   Open a new terminal window in the root directory, install dependencies, and start the Vite development server:
   ```bash
   npm install
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

---

## 📸 Preview

* **Home Page**: A stunning hero landing page featuring curated premium gradients and responsive layouts.
* **Explore Centers**: Search by city (e.g., "Delhi") to view centers in a list alongside an interactive map pinned with coordinates.

---

## 📄 License
This project is open-source and available under the MIT License.
