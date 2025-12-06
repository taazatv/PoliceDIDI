import React, { useEffect, useState, useRef } from "react";
import GrievanceForm from "./Form/Form";
import "./Overlay.css";

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const timerRef = useRef(null);

  // Start 5-second inactivity timer
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShowOverlay(true);
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, []);

  // Remove overlay on click/touch
  const handleUserActivity = () => {
    clearTimeout(timerRef.current);
    setShowOverlay(false);
  };

  return (
    <>
      {/* AUTO OVERLAY */}
      {showOverlay && (
        <div className="overlay" onClick={() => setShowOverlay(false)}>
          <div className="overlay-slider">
            <img src="/img1.jpg.jpg" alt="Overlay" />
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
