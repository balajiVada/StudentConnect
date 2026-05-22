import React, { useEffect, useState } from "react";
import api from "../../services/api";
import EventsFilter from "./EventsFilter";
import EventCard from "./EventCard";
import "./EventsPage.css";

const EventsPage = () => {
  //   const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = async (page) => {
    try {
      const res = await api.get(`/events?page=${page}&limit=6`);
      setEvents(res.data.events);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };


  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => event.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="ef-container">
      <h2 className="ef-title">Explore Exciting Events</h2>
      <div className="ef-content">
        <div className="ef-sidebar">
          <EventsFilter
            events={events}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>
        <div className="ef-main">
          <input
            type="text"
            className="ef-search-bar"
            placeholder="🔍 Search events by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="ef-events-grid">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
            {filteredEvents.length === 0 && (
              <p className="ef-no-results">No events match your filters.</p>
            )}
          </div>
          <div className="ef-pagination">
            <button
              className="ef-page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`ef-page-btn ${
                  currentPage === i + 1 ? "ef-active-page" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="ef-page-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
