import React, { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import './EventsPage.css'; // Reuse existing CSS if consistent

const EventCard = ({ event }) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  return (
    <div className="ef-card">
      <h3 className="ef-card-title">{event.title}</h3>
      <p className="ef-card-sub"><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
      <p className="ef-card-sub"><strong>Register by:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}</p>
      <p className="ef-card-sub"><strong>Location:</strong> {event.location}</p>
      <p className="ef-card-sub"><strong>Organizer:</strong> {event.organizer}</p>
      <p className="ef-card-desc">{event.description}</p>

      <div className="ef-card-tags">
        {event.tags.map(tag => (
          <span key={tag} className="ef-card-tag">{tag}</span>
        ))}
      </div>

      <div className="ef-card-actions">
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="ef-card-link"
        >
          View Event
        </a>

        <button
          className="ef-save-button"
          onClick={toggleSave}
          aria-label={isSaved ? 'Unsave Event' : 'Save Event'}
        >
          {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
