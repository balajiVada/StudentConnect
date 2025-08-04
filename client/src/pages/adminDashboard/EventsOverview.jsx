import React, { useState, useEffect } from "react";
import "./EventOverview.css";
import api from "../../services/api";

const EventsOverview = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [editingId, setEditingId] = useState(null); 

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    eventDate: "",
    registrationDeadline: "",
    location: "",
    organizer: "",
    link: "",
    tags: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingId(null);
    setNewEvent({
      title: "",
      description: "",
      eventDate: "",
      registrationDeadline: "",
      location: "",
      organizer: "",
      link: "",
      tags: "",
    });
  };

  const handleSaveEvent = async () => {
    try {
      const payload = {
        ...newEvent,
        tags: newEvent.tags.split(",").map((tag) => tag.trim()).filter(tag => tag !== ''),
      };

      if (isEditMode) {
        // Update existing event
        await api.put(`/events/${editingId}`, payload);
        fetchEvents(); // Refresh the list after update
      } else {
        // Create new event
        const res = await api.post("/events", payload);
        setEvents([...events, res.data]);
      }
      resetModal();
    } catch (err) {
      console.error("Error saving event:", err.response?.data || err.message);
      // Use a custom modal/message box for errors instead of alert()
      console.log("Failed to save event:", err.response?.data?.error || 'Unknown error.');
    }
  };

  const handleEditClick = (event) => { 
    setIsEditMode(true);
    setEditingId(event._id);
    setNewEvent({
      title: event.title,
      description: event.description,
      eventDate: event.eventDate.split('T')[0], 
      registrationDeadline: event.registrationDeadline.split('T')[0], 
      location: event.location,
      organizer: event.organizer,
      link: event.link,
      tags: event.tags.join(', '),
    });
    setShowModal(true);
  };

  const handleDeleteEvent = async (id) => {
    console.log('Confirm deletion of event ID:', id);
    if (!window.confirm('Are you sure you want to delete this event?')) return; 

    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      // In a real app, you might show an error message to the user
    }
  };

  return (
    <div className="eo-events-overview">
      <div className="eo-events-header">
        <h2 className="eo-events-title">Events Management</h2>
        <button className="eo-add-event-button" onClick={() => setShowModal(true)}>+ Add Event</button>
      </div>

      <div className="eo-search-bar">
        <input
          type="text"
          placeholder="🔍 Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="eo-events-grid">
        {events
          .filter((event) =>
            event.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((event) => (
            <div key={event._id} className="eo-event-card">
              <div className="eo-event-card-header">
                <h3 className="eo-event-card-title">{event.title}</h3>
                <div className="eo-card-actions">
                  <button className="eo-edit-btn" onClick={() => handleEditClick(event)}>
                    Edit
                  </button>
                  <button className="eo-delete-btn" onClick={() => handleDeleteEvent(event._id)}>
                    Delete
                  </button>
                </div>
              </div>
              <p className="eo-event-detail">
                <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="eo-event-detail">
                <strong>Register By:</strong> {new Date(event.registrationDeadline).toLocaleDateString()}
              </p>
              <p className="eo-event-detail">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="eo-event-detail">
                <strong>Organizer:</strong> {event.organizer}
              </p>
              <p className="eo-event-detail">
                <strong>Description:</strong> {event.description}
              </p>
              <p className="eo-event-detail">
                <strong>Tags:</strong> {event.tags.join(", ")}
              </p>
              <p className="eo-event-detail">
                <a href={event.link} target="_blank" rel="noopener noreferrer">
                  Open Event
                </a>
              </p>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="eo-modal-container">
          <div className="eo-modal">
            <h3 className="eo-modal-title">{isEditMode ? 'Edit Event' : 'Add New Event'}</h3>
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            ></textarea>
            <input
              type="date"
              value={newEvent.eventDate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, eventDate: e.target.value })
              }
            />
            <input
              type="date"
              value={newEvent.registrationDeadline}
              onChange={(e) =>
                setNewEvent({ ...newEvent, registrationDeadline: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Organizer"
              value={newEvent.organizer}
              onChange={(e) =>
                setNewEvent({ ...newEvent, organizer: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Event Link"
              value={newEvent.link}
              onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newEvent.tags}
              onChange={(e) => setNewEvent({ ...newEvent, tags: e.target.value })}
            />
            <div className="eo-modal-actions">
              <button className="eo-save-btn" onClick={handleSaveEvent}>{isEditMode ? 'Update' : 'Save'}</button>
              <button className="eo-cancel-btn" onClick={resetModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsOverview;

