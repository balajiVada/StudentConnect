import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './PersonalizedOpportunities.css';

const PersonalizedOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);

  const getUserIdFromToken = () => {
    const tokenString = localStorage.getItem('user');
    if (!tokenString) return null;
    try {
      const token = JSON.parse(tokenString);
      return token.id || null;
    } catch (error) {
      console.error('Error parsing user token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchOpportunities = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const res = await api.get('/opportunities/customized', {
          headers: { 'x-user-id': userId },
        });
        
        const topThree = res.data.slice(0, 3);
        setOpportunities(topThree);
      } catch (error) {
        console.error('Error fetching personalized opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <div className="opportunities-section">
      <h2 className="opportunities-title">Personalized Jobs & Internships</h2>
      <div className="opportunities-list">
        {opportunities.map((opportunity, index) => (
          <div key={index} className="opportunity-card">
            <div className="opportunity-header">
              <h3 className="opportunity-role">{opportunity.title}</h3>
              <span className="opportunity-company">{opportunity.company}</span>
            </div>
            <a
              href={opportunity.link}
              className="opportunity-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </a>
            <div className="opportunity-details">
              <p><span>{opportunity.type}</span></p>
              <p><span>Apply By: {opportunity.applicationDeadline}</span></p>
            </div>
            <div className="opportunity-skills">
              {opportunity.skills?.map((skill, i) => (
                <span key={i} className="opportunity-skill">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedOpportunities;



