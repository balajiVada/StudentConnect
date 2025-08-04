import React from 'react';
import './ResourcePage.css';

const tags = [
  "Java", "C++", "PenTesting", "Cryptography", "Cyber Security",
  "Python", "Linux", "Networks", "Web Security", "Reverse Engineering",
  "JavaScript", "HTML", "CSS"
];

const ResourceFilter = ({ selectedTags, onTagToggle }) => {
  return (
    <div className="rf-filter-box">
      <h4 className="rf-filter-title">Filter by Tags</h4>
      <div className="rf-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`rf-tag ${selectedTags.includes(tag) ? 'rf-selected' : ''}`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResourceFilter;



