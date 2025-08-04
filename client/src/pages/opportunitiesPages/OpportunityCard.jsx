

import React from 'react';
import './OpportunitiesPage.css'; 

const OpportunityCard = ({ opportunity }) => {
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
      <a href="#" className="ef-card-link">
        View Opportunity
      </a>
    </div>
  );
};

export default OpportunityCard;
