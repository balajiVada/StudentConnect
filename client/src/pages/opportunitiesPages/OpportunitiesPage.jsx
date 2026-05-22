import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./OpportunitiesPage.css";
import OpportunitiesFilter from "./OpportunityFilter";
import OpportunityCard from "./OpportunityCard";

const CustOpportunitiesPage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeTags]);

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
    const fetchOpportunities = async () => {
      if (!userId) {
        console.warn("No user ID found in token.");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/opportunities/customized", {
          headers: { "x-user-id": userId },
        });
        setOpportunities(res.data);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [userId]);

  const matchesSearch = (opportunity) =>
    opportunity.title.toLowerCase().includes(search.toLowerCase());

  const matchesTags = (opportunity) => {
    if (activeTags.length === 0) return true;
    return activeTags.some((tag) =>
      [opportunity.type, opportunity.title, ...opportunity.skills].some(
        (field) => field.toLowerCase().includes(tag.toLowerCase())
      )
    );
  };

  const filteredOpportunities = opportunities.filter(
    (opp) => matchesSearch(opp) && matchesTags(opp)
  );

  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOpportunities = filteredOpportunities.slice(
    startIndex,
    endIndex
  );

  if (loading) {
    return (
      <div className="ef-container">
        <div className="loading-container">
          <p>Loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ef-container">
      <h2 className="ef-title">Opportunities For You</h2>
      <div className="ef-content">
        <OpportunitiesFilter
          opportunities={opportunities}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />

        <div className="ef-main">
          <input
            type="text"
            placeholder="🔍 Search opportunities by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ef-search-bar"
          />

          <div className="ef-events-grid">
            {paginatedOpportunities.length === 0 ? (
              <p className="ef-no-results">
                No opportunities match your filters.
              </p>
            ) : (
              paginatedOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="ef-pagination">
              <button
                className="ef-page-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={`ef-page-btn ${
                    currentPage === idx + 1 ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                className="ef-page-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustOpportunitiesPage;

