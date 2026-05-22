// frontend/src/components/events/EventCollection.jsx
import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api'; // Adjust based on your structure
import './EventCollection.css';

const EventCollection = () => {
  const [events, setEvents] = useState([]);
  const sliderRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider && events.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % events.length;
        slider.scrollTo({
          left: slider.offsetWidth * currentIndex.current,
          behavior: 'smooth',
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [events]);

  return (
    <div className="events-container">
      <h2 className="events-heading">Upcoming Events</h2>
      <div ref={sliderRef} className="events-slider">
        {events.map((event, index) => (
          <div key={index} className="event-slide">
            <div className="event-card">
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              <p className="event-meta">Event Date: <span>{event.eventDate}</span></p>
              <p className="event-meta">Register By: <span>{event.registrationDeadline}</span></p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="event-button"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCollection;




