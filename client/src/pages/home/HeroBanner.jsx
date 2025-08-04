import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      {/* Content */}
      <div className="hero-content">
        <h2 className="hero-title">
          Empowering Students with Resources and <span>Greater Opportunities</span>
        </h2>
        <button className="hero-button">Learn More</button>
      </div>
    </div>
  );
};

export default HeroBanner;
