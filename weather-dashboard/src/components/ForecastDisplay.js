import React from "react";

const getIcon = (condition = "") => {
  const w = condition.toLowerCase();
  if (w.includes("cloud")) return "☁️";
  if (w.includes("rain")) return "🌧️";
  if (w.includes("clear") || w.includes("sun")) return "☀️";
  return "🌈";
};

const styles = {
  forecast: {
    marginTop: "2rem",
    textAlign: "center",
    color: "#fff",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#ffffffcc",
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "1rem",
    padding: "0 1rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "1rem",
    transition: "transform 0.3s ease, background 0.3s ease",
    backdropFilter: "blur(6px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
    color: "#ffffffdd",
  },
  cardHover: {
    transform: "scale(1.05)",
    background: "rgba(255, 255, 255, 0.2)",
  },
  text: {
    margin: "0.5rem 0",
    fontSize: "0.95rem",
  },
};

const ForecastDisplay = ({ forecast }) => {
  if (!Array.isArray(forecast) || forecast.length === 0) return null;

  return (
    <div style={styles.forecast}>
      <h3 style={styles.heading}>5-Day Forecast</h3>
      <div style={styles.cards}>
        {forecast.map((day, index) => {
          const { date = "N/A", weather = "Unknown", temperature = "N/A" } = day;
          return (
            <div
              key={index}
              style={styles.card}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, styles.cardHover);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, styles.card);
              }}
            >
              <p style={styles.text}>{date}</p>
              <div style={{ fontSize: "24px" }}>{getIcon(weather)}</div>
              <p style={styles.text}>{temperature}°C</p>
              <p style={styles.text}>{weather}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
