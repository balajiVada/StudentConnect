import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./PersonalizedResources.css";

const PersonalizedResources = () => {
  const [resources, setResources] = useState([]);

  const getUserIdFromToken = () => {
    const tokenString = localStorage.getItem("user");
    if (!tokenString) return null;
    try {
      const token = JSON.parse(tokenString);
      return token.id || null;
    } catch (error) {
      console.error("Error parsing user token:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchTopResources = async () => {
      if (!userId) {
        console.warn("No user ID found in token.");
        return;
      }

      try {
        const res = await api.get("/resources/resource/customized", {
          headers: { "x-user-id": userId },
        });

        const topThree = Array.isArray(res.data.resources)
          ? res.data.resources.slice(0, 3)
          : [];

        // const topThree = res.data.slice(0, 3); // Get top 3
        setResources(topThree);
      } catch (error) {
        console.error("Error fetching personalized resources:", error);
      }
    };

    fetchTopResources();
  }, [userId]);

  return (
    <div className="resources-section">
      <h3 className="resources-heading">Personalized Resources</h3>
      <div className="resources-list">
        {resources.map((resource, index) => (
          <div key={index} className="resource-card">
            <h4 className="resource-title">{resource.title}</h4>
            <p className="resource-description">{resource.description}</p>
            <a
              href={resource.link}
              className="resource-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resource
            </a>
            <div className="resource-tags">
              {resource.tags.map((tag, i) => (
                <span key={i} className="resource-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalizedResources;
