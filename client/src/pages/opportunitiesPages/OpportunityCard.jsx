import React, { useState } from 'react';
import './OpportunitiesPage.css';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const OpportunityCard = ({ opportunity }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="ef-card">
      <div className="ef-card-header">
        <h3 className="ef-card-title">
          {opportunity.title}
          {opportunity.isPreferred && (
            <span className="ef-star-badge" title="Recommended Opportunity"> ★</span>
          )}
        </h3>
      </div>

      <p className="ef-card-sub"><strong>Type:</strong> {opportunity.type}</p>
      <p className="ef-card-desc">{opportunity.description}</p>

      <div className="ef-card-tags">
        {opportunity.skills?.map((skill, idx) => (
          <span className="ef-card-tag" key={idx}>{skill}</span>
        ))}
      </div>

      <div className="ef-card-actions">
        <a href="#" className="ef-card-link">
          View Opportunity
        </a>
        <button
          className="ef-save-button"
          onClick={toggleSave}
          aria-label={isSaved ? 'Unsave Opportunity' : 'Save Opportunity'}
        >
          {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
