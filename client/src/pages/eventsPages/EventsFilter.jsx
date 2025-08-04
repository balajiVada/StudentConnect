import React from 'react';

const EventsFilter = ({ events, selectedTags, setSelectedTags }) => {
  const allTags = Array.from(new Set(events.flatMap(e => e.tags)));

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="ef-filter-box">
      <h4 className="ef-filter-title">Filter by Tags</h4>
      <div className="ef-tags">
        {allTags.map((tag) => (
          <button
            key={tag}
            className={`ef-tag ${selectedTags.includes(tag) ? 'ef-selected' : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsFilter;
