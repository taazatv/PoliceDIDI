import React, { useEffect, useState, useRef } from "react";
import GrievanceForm from "./Form/Form";
import "./Overlay.css";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const timerRef = useRef(null);

  // Function to start the inactivity timer
  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowOverlay(true);
    }, 15000); // 15 seconds
  };

  // Reset timer on user activity
  const handleUserActivity = () => {
    startTimer();
    setShowOverlay(false);
  };

  useEffect(() => {
    startTimer();

    // Listen for clicks and touches anywhere on the page
    window.addEventListener("click", handleUserActivity);
    window.addEventListener("touchstart", handleUserActivity);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
    };
  }, []);

  return (
    <>
      {/* AUTO OVERLAY */}
      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-slider">
            <img src="/img1.jpg" alt="Overlay" />
          </div>
        </div>
      )}

      {/* ORIGINAL FORM */}
      <div onClick={handleUserActivity} onTouchStart={handleUserActivity}>
        <GrievanceForm />
      </div>
    </>
  );
}

export default App;
