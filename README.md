# 🌍 Earthquake Visualizer  

A React application that visualizes real-time earthquake data from the **USGS Earthquake API** on an interactive map using **React Leaflet**.  

---

## 🚀 Features  

- 📡 **Live Data** – Fetches earthquake data from [USGS](https://earthquake.usgs.gov/).  
- 🗺️ **Interactive Map** – Displays earthquakes on a world map with zoom and pan support.  
- 🎨 **Magnitude-based Styling** – Circle markers are color-coded and scaled by magnitude.  
- 🔍 **Auto-Fit Bounds** – Map auto-adjusts to show all earthquakes in the current dataset.  
- 📊 **Info Panel** – Displays statistics (total quakes, strongest quake, significant events).  
- 📖 **Legend** – Magnitude scale legend for quick interpretation.  
- 📱 **Responsive UI** – Mobile-friendly navbar with filter controls.  
- 🌊 **Tsunami Alerts** – Highlights events that triggered tsunami warnings.  

---

## 🛠️ Tech Stack  

- **React** (with hooks)  
- **Vite** (fast bundler)  
- **React Leaflet + Leaflet** (maps & markers)  
- **Tailwind CSS** (styling)  

---

## 📷 Screenshots  

- **Map with Earthquakes** (circle markers sized & colored by magnitude)  
- **Info Panel & Legend** (bottom corners)  
- **Navbar with Filters** (time window + magnitude range)
- <img width="1918" height="972" alt="image" src="https://github.com/user-attachments/assets/63ffc5b8-0a35-4564-a35a-83dbe4648597" />


---

## ⚡ Installation & Setup  

1. Clone the repo:  
   ```sh
   git clone https://github.com/harish-pasupuleti/Earthquake-Visualizer.git
   cd Earthquake-Visualizer

2.Install dependencies:
```sh
npm install
```

3.Run the app locally:
```sh
npm run dev
