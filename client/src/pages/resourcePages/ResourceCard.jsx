import React from 'react';
import './ResourcePage.css';

const ResourceCard = ({ resource }) => {
  return (
    <div className="rp-card">
      <h3 className="rp-card-title">
        {resource.title}
        {resource.isPreferred && (
          <span className="rp-recommended">Recommended</span>
        )}
      </h3>

      <p className="rp-card-desc">{resource.description}</p>

      <div className="rp-details">
        <div className="rp-detail-row">
          <strong>Type:</strong> <span className="rp-type">{resource.type}</span>
        </div>

        <div className="rp-detail-row">
          <strong>Tags:</strong>
          <div className="rp-card-tags">
            {resource.tags.map((tag, index) => (
              <span key={index} className="rp-card-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="rp-card-link"
      >
        View Resource
      </a>
    </div>
  );
};

export default ResourceCard;
