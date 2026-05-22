import React from 'react';
import './OpportunitiesPage.css';

// Define tags by categories
const categoryTags = [
  "Full time", "Internship", "Scholarships"
];

const roleTags = [
  "Full Stack Developer", "DevOps", "Backend Developer",
  "UI/UX Designer", "Mobile App Developer", "Cyber Security Analyst",
  "Data Scientist"
];

const skillTags = [
  "Excel", "Python", "Java", "Backend", "Soft Skills",
  "Machine Learning", "JavaScript", "React", "Docker"
];

// Combine all tags into one array (functionality remains unchanged)
const filterTags = [...categoryTags, ...roleTags, ...skillTags];

const OpportunitiesFilter = ({ activeTags, setActiveTags }) => {
  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Render a group of tags with a title
  const renderTagGroup = (title, tags) => (
    <div className="of-tag-group">
      <h3 className="of-tag-group-title">{title}</h3>
      <div className="of-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`of-tag ${activeTags.includes(tag) ? 'active' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="of-sidebar">
      <h2 className="of-filter-title">Filter by Tags</h2>
      {renderTagGroup("Categories", categoryTags)}
      {renderTagGroup("Filter by Role", roleTags)}
      {renderTagGroup("Filter by Skill", skillTags)}
    </div>
  );
};

export default OpportunitiesFilter;


