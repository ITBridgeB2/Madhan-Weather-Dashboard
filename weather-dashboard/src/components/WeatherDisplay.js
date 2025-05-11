import React from "react";

const getWeatherIcon = (condition = "") => {
  const weather = condition.toLowerCase();
  if (weather.includes("cloud")) return "☁️";
  if (weather.includes("rain")) return "🌧️";
  if (weather.includes("sun") || weather.includes("clear")) return "☀️";
  return "❓";
};

const WeatherDisplay = ({ data }) => {
  if (!data || typeof data !== "object") return <p>Loading...</p>;

  const {
    city = "Unknown City",
    temperature = "N/A",
    condition = "Unknown",
    humidity = "N/A",
    wind_speed = "N/A",
  } = data;

  // Inline CSS for WeatherDisplay
  const styles = {
    container: {
      padding: "20px",
      background: "lightblue",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      marginBottom: "20px",
      color: "#333",
    },
    city: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    info: {
      fontSize: "1.1rem",
      margin: "10px 0",
    },
    icon: {
      fontSize: "40px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.city}>{city}</h2>
      <p style={styles.icon}>{getWeatherIcon(condition)} {condition}</p>
      <p style={styles.info}>🌡️ Temperature: {temperature}°C</p>
      <p style={styles.info}>💧 Humidity: {humidity}%</p>
      <p style={styles.info}>💨 Wind Speed: {wind_speed} km/h</p>
    </div>
  );
};

export default WeatherDisplay;
