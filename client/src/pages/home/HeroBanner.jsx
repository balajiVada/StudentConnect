import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h2 className="display-xl hero-title">
          Connect.<br />Learn. Grow.
        </h2>
        <p className="subhead hero-subtitle">
          Your all-in-one platform for campus resources, events, and career opportunities.
        </p>
        <button className="pill-btn pill-primary">Learn More</button>
      </div>
    </div>
  );
};

export default HeroBanner;
