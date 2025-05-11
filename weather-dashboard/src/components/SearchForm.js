import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Manage focus state

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanCity = city.trim();
    if (cleanCity) {
      onSearch(cleanCity);
      setCity("");
    }
  };

  // Inline CSS for SearchForm
  const styles = {
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "30px",
      borderRadius: "50px",
      padding: "10px",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    input: {
      padding: "15px",
      marginRight: "15px",
      borderRadius: "30px",
      fontSize: "1.1rem",
      border: "2px solid #fff",
      outline: "none",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      width: "250px",
      transition: "all 0.3s ease",
    },
    inputFocus: {
      borderColor: "#1abc9c",
      boxShadow: "0 0 5px rgba(26, 188, 156, 0.7)",
    },
    button: {
      padding: "15px 25px",
      backgroundColor: "#16a085",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      fontSize: "1.1rem",
      transition: "background-color 0.3s, transform 0.2s",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    buttonHover: {
      backgroundColor: "#1abc9c",
      transform: "scale(1.05)",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Search for a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          ...styles.input,
          ...(isFocused ? styles.inputFocus : {}),
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        type="submit"
        style={styles.button}
        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#16a085"}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
