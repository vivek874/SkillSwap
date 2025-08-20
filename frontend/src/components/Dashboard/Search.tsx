import React, { useState } from "react";
import axios from "axios";

const SearchBar: React.FC = () => {
  const [learn, setLearn] = useState("");
  const [teach, setTeach] = useState("");

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (learn) params.append("learn", learn);
      if (teach) params.append("teach", teach);

      const token = localStorage.getItem("accessToken");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/search/?${params.toString()}`,
        {
            headers:{
                Authorization:`Bearer ${token}`  
            }
        }
      );
      console.log("Search results:", response.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "700px",
          background: "#f8fafc",
          padding: "10px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <input
          type="text"
          placeholder="What skill are you looking for?"
          value={learn}
          onChange={(e) => setLearn(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "10px",
            fontSize: "15px",
            color: "#334155",

          }}
        />
        <input
          type="text"
          placeholder="What can you teach?"
          value={teach}
          onChange={(e) => setTeach(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            background: "transparent",
            padding: "10px",
            fontSize: "15px",
            color: "#334155",

          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "skyblue",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
