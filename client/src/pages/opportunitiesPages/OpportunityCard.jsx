import React, { useState } from 'react';
import './OpportunitiesPage.css';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

const OpportunityCard = ({ opportunity }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  // Extract a letter for the logo tile
  const logoLetter = opportunity.title ? opportunity.title.charAt(0).toUpperCase() : 'O';

  return (
    <div className="opp-card group">
      <div className="opp-card-left">
        <div className="opp-logo-tile">
          {logoLetter}
        </div>
        <div className="opp-info">
          <span className="opp-meta">{opportunity.type}</span>
          <h3 className="opp-title">
            {opportunity.title}
            {opportunity.isPreferred && (
              <span className="opp-star-badge" title="Recommended Opportunity">★</span>
            )}
          </h3>
          <p className="opp-desc">{opportunity.description}</p>
          <div className="opp-card-tags">
            {opportunity.skills?.map((skill, idx) => (
              <span className="opp-card-tag" key={idx}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="opp-card-actions">
        <a href={opportunity.link || '#'} className="opp-apply-btn" target="_blank" rel="noopener noreferrer">
          Apply Now
        </a>
        <button
          className="opp-save-button"
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
