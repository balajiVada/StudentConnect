import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Loader from '../../components/common/Loader';
import ResourceFilter from "./ResourceFilter";
import ResourceCard from "./ResourceCard";
import "./ResourcePage.css";

const ResourcePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Move userId logic above useEffect
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
    const fetchResources = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(
          `/resources/resource/customized?page=${currentPage}&limit=6`,
          {
            headers: { "x-user-id": userId },
          }
        );
        setResources(res.data.resources);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [userId, currentPage]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );

    const matchesTags =
      selectedTags.length === 0 ||
      resource.tags.some((tag) => selectedTags.includes(tag));

    return matchesSearch && matchesTags;
  });

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <div className="rp-container">
      <h2 className="rp-title">Explore Learning Resources</h2>
      <div className="rp-content">
        <div className="rp-sidebar">
          <ResourceFilter
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        </div>
        <div className="rp-main">
          <input
            type="text"
            className="rp-search-bar"
            placeholder="🔍 Search resources by title, description or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="rp-grid">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
            {filteredResources.length === 0 && (
              <p className="rp-no-results">No resources match your filters.</p>
            )}
          </div>

          <div className="rp-pagination">
            <button
              className="rp-page-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ◀ Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`rp-page-btn ${
                  currentPage === i + 1 ? "rp-active-page" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="rp-page-btn"
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

export default ResourcePage;


