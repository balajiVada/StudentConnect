import React from 'react';

const EventCard = ({ event }) => {
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
      <a href={event.link} target="_blank" rel="noopener noreferrer" className="ef-card-link">
        View Event
      </a>
    </div>
  );
};

export default EventCard;
