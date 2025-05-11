import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import SearchForm from "./components/SearchForm";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState("default");
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // State to control visibility of search history

  const API_BASE = "http://localhost:5000"; // Update if backend runs elsewhere

  // ✅ Fetch current weather
  const fetchWeather = async (city) => {
    const cleanCity = city.trim();
    if (!cleanCity) return;

    try {
      const res = await axios.get(`${API_BASE}/weather/${cleanCity}`);
      setWeatherData(res.data);
      if (res.data.condition) {
        updateBackground(res.data.condition);
      }
      addToSearchHistory(cleanCity);
    } catch (err) {
      alert(err.response?.data?.error || "City not found");
    }
  };

  // ✅ Set background style
  const updateBackground = (condition) => {
    const weather = condition?.toLowerCase() || "";
    if (weather.includes("cloud")) setBackground("cloudy");
    else if (weather.includes("rain")) setBackground("rainy");
    else if (weather.includes("sun") || weather.includes("clear")) setBackground("sunny");
    else setBackground("default");
  };

  // ✅ Load default city on first render
  useEffect(() => {
    fetchWeather("Bangalore");
  }, []);

  // ✅ Add city to search history with date
  const addToSearchHistory = (city) => {
    const date = new Date().toLocaleString(); // Get the current date and time
    const newHistory = [{ city, date }, ...searchHistory];
    if (newHistory.length > 5) {
      newHistory.pop(); // Keep only the last 5 cities
    }
    setSearchHistory(newHistory);
  };

  // ✅ Toggle search history visibility
  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  // ✅ Inline CSS styles
  const styles = {
    app: {
      background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Warm gradient background
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontFamily: "'Arial', sans-serif",
      padding: "20px",
    },
    content: {
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "20px",
      padding: "40px",
      textAlign: "center",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      backdropFilter: "blur(10px)",
      width: "100%",
      maxWidth: "650px",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "20px",
      fontWeight: "600",
      color: "#fff",
    },
    searchHistory: {
      marginTop: "20px",
      textAlign: "left",
      width: "100%",
      maxWidth: "400px",
      fontSize: "1.1rem",
      color: "#fff",
      padding: "10px",
      background: "rgba(0, 0, 0, 0.5)",
      borderRadius: "10px",
    },
    searchHistoryButton: {
      padding: "12px",
      margin: "5px 0",
      backgroundColor: "#34495e",
      border: "none",
      borderRadius: "8px",
      color: "#fff",
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s, transform 0.2s",
    },
    searchHistoryButtonHover: {
      backgroundColor: "#2c3e50",
      transform: "scale(1.05)",
    },
    showHistoryButton: {
      padding: "12px 25px",
      backgroundColor: "#1abc9c",
      border: "none",
      borderRadius: "50px",
      color: "#fff",
      cursor: "pointer",
      marginTop: "15px",
      fontSize: "1.1rem",
      transition: "background-color 0.3s, transform 0.2s",
    },
    backgroundClass: {
      cloudy: { background: "#b0c4de" }, // Light gray for cloudy weather
      rainy: { background: "#6fa3ef" }, // Blueish tint for rainy weather
      sunny: { background: "#fcbf49" }, // Yellowish for sunny weather
      default: { background: "transparent" }, // Default (no special background)
    },
  };

  return (
    <div style={{ ...styles.app, ...styles.backgroundClass[background] }}>
      <div style={styles.content}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Weather App
        </motion.h1>

        <SearchForm onSearch={fetchWeather} />
        <WeatherDisplay data={weatherData} />
        
        {/* Show Search History Button */}
        <button
          style={styles.showHistoryButton}
          onClick={toggleHistory}
        >
          {showHistory ? "Hide Search History" : "Show Search History"}
        </button>

        {/* Conditionally render search history */}
        {showHistory && (
          <div style={styles.searchHistory}>
            <h3>Search History</h3>
            {searchHistory.map((entry, index) => (
              <button
                key={index}
                style={styles.searchHistoryButton}
                onClick={() => fetchWeather(entry.city)}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.searchHistoryButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#34495e"}
              >
                {entry.city} - {entry.date}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
