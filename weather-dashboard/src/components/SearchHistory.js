// const SearchHistory = ({ history }) => {
//     return (
//       <div>
//         <h3>Search History</h3>
//         <ul>
//           {history.map((entry) => (
//             <li key={entry.id}>
//               {entry.city} - {new Date(entry.timestamp).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default SearchHistory;
  



import React from "react";

const SearchHistory = ({ history }) => {
  // Inline CSS for SearchHistory
  const styles = {
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(6px)",
      textAlign: "left",
      marginTop: "20px",
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "10px",
      color: "#fff",
      fontWeight: "600",
    },
    list: {
      listStyleType: "none",
      padding: "0",
      margin: "0",
    },
    listItem: {
      padding: "10px",
      marginBottom: "8px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "#fff",
      fontSize: "1rem",
      transition: "background-color 0.3s",
    },
    listItemHover: {
      backgroundColor: "#16a085", // Color change on hover
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Search History</h3>
      <ul style={styles.list}>
        {history.map((entry) => (
          <li
            key={entry.id}
            style={styles.listItem}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1abc9c")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")}
          >
            {entry.city} - {new Date(entry.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
