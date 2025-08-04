import React from 'react';
import './SkeletonLoader.css'; 

const SkeletonLoader = () => {
  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-line-title"></div>
      <div className="skeleton-line-text"></div>
      <div className="skeleton-line-text short"></div>
      <div className="skeleton-tags-container">
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag"></div>
        <div className="skeleton-tag short"></div>
      </div>
    </div>
  );

  return (
    <div className="personalized-resources-container">
      <h2 className="skeleton-heading"> </h2>
      <div className="skeleton-cards-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default SkeletonLoader;