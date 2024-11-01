import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [advice, setAdvice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getAdvice = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(res.data.slip);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="app-wrapper">
      <div className="advice-container">
        <p className="advice-id">ADVICE #{advice.id}</p>
        <h1 className="advice-text">"{advice.advice}"</h1>
        <div className="divider">
          <div className="line"></div>
          <div className="pause-marks">
            <div className="vertical-line"></div>
            <div className="vertical-line"></div>
          </div>
          <div className="line"></div>
        </div>
        <button 
          className="dice-button"
          onClick={getAdvice}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor"/>
            <circle cx="12" cy="12" r="2" fill="#1F2632"/>
            <circle cx="7" cy="7" r="2" fill="#1F2632"/>
            <circle cx="17" cy="7" r="2" fill="#1F2632"/>
            <circle cx="17" cy="17" r="2" fill="#1F2632"/>
            <circle cx="7" cy="17" r="2" fill="#1F2632"/>
          </svg>
        </button>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
}

export default App;