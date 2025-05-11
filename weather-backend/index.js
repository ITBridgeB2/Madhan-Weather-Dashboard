

// {
//     "name": "weather-backend",
//     "version": "1.0.0",
//     "description": "Backend for Weather Dashboard",
//     "main": "index.js",
//     "scripts": {
//       "start": "node index.js",
//       "dev": "nodemon index.js"
//     },
//     "keywords": [],
//     "author": "",
//     "license": "ISC",
//     "dependencies": {
//       "axios": "^1.4.0",
//       "cors": "^2.8.5",
//       "dotenv": "^16.3.1",
//       "express": "^4.18.2",
//       "mysql2": "^3.6.0"
//     },
//     "devDependencies": {
//       "nodemon": "^3.1.0"
//     }
//   }
  





// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const db = require("./db");
// require("dotenv").config();

// const app = express(); // ✅ This line is mandatory

// app.use(cors());
// app.use(express.json());

// // GET current weather
// app.get("/weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//     );

//     const data = response.data;

//     const result = {
//       city: data.name,
//       temperature: data.main.temp,
//       humidity: data.main.humidity,
//       weather: data.weather[0].main,
//     };

//     db.query("INSERT INTO searches (city) VALUES (?)", [data.name]);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching weather" });
//   }
// });

// // ✅ GET 5-day forecast
// app.get("/forecast/:city", async (req, res) => {
//   const city = req.params.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   try {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
//     const response = await axios.get(url);

//     const daily = response.data.list.filter(entry =>
//       entry.dt_txt.includes("12:00:00")
//     ).slice(0, 5);

//     const forecast = daily.map(entry => ({
//       date: entry.dt_txt.split(" ")[0],
//       temperature: entry.main.temp,
//       weather: entry.weather[0].main,
//     }));

//     res.json(forecast);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching forecast" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

  



// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const db = require("./db");
// require("dotenv").config();

// const app = express(); // ✅ Express app

// app.use(cors());
// app.use(express.json());

// /**
//  * GET current weather
//  */
// app.get("/weather/:city", async (req, res) => {
//   const city = req.params.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
//     );

//     const data = response.data;

//     const result = {
//       city: data.name,
//       temperature: data.main.temp,
//       humidity: data.main.humidity,
//       weather: data.weather[0].main,
//       temp_min: data.main.temp_min, // ✅ added
//       temp_max: data.main.temp_max  // ✅ added
//     };

//     db.query("INSERT INTO searches (city) VALUES (?)", [data.name]);
//     res.json(result);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching weather" });
//   }
// });

// /**
//  * GET 5-day forecast
//  */
// app.get("/forecast/:city", async (req, res) => {
//   const city = req.params.city;
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   try {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
//     const response = await axios.get(url);

//     const daily = response.data.list
//       .filter(entry => entry.dt_txt.includes("12:00:00"))
//       .slice(0, 5);

//     const forecast = daily.map(entry => ({
//       date: entry.dt_txt.split(" ")[0],
//       temperature: entry.main.temp,
//       weather: entry.weather[0].main
//     }));

//     res.json(forecast);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching forecast" });
//   }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });





const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// ✅ MySQL connection config
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Madhan@4512", // ⬅️ Replace with your actual password
  database: "weather_db",
});

// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ GET current weather by city
app.get("/weather/:city", (req, res) => {
  const city = req.params.city;
  const sql = "SELECT city, temperature, `condition`, humidity, wind_speed FROM weather_data WHERE city = ?";
  db.query(sql, [city], (err, result) => {
    if (err) {
      console.error("❌ Error fetching weather:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }
    res.json(result[0]);
  });
});

// ✅ GET 5-day forecast by city
app.get("/forecast/:city", (req, res) => {
  const city = req.params.city;
  const sql = "SELECT forecast FROM weather_data WHERE city = ?";
  db.query(sql, [city], (err, result) => {
    if (err) {
      console.error("❌ Error fetching forecast:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }

    try {
      const forecast = JSON.parse(result[0].forecast);
      res.json(forecast);
    } catch (e) {
      res.status(500).json({ error: "Invalid forecast data" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
