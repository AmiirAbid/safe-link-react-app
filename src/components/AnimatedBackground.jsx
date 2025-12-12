// AnimatedBackground.jsx
import React from "react";

// Generate particles ONCE
const PARTICLES = [...Array(70)].map(() => {
  const size = Math.random() * 2 + 1; // particle size
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${10 + Math.random() * 10}s`,
    size,
    driftX: `${Math.random() * 40 - 20}px`, // random horizontal movement
    driftY: `${Math.random() * 40 - 20}px`,
        // opacity: 0.15 + Math.random() * 0.6,
 // random vertical movement
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
