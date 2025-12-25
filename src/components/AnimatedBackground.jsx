// AnimatedBackground.jsx
import React from "react";

const PARTICLES = [...Array(70)].map(() => {
  const size = Math.random() * 2 + 1; 
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${10 + Math.random() * 10}s`,
    size,
    driftX: `${Math.random() * 40 - 20}px`, 
    driftY: `${Math.random() * 40 - 20}px`,
    
  };
});

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-container">
      <div className="bg-gradient" />

      <div className="particles-layer">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle move"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              "--drift-x": p.driftX,
              "--drift-y": p.driftY,
            }}
          />
        ))}
      </div>

      <div className="radial-glow" />
    </div>
  );
};

export default AnimatedBackground;
