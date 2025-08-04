import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./ResourceOverview.css";

const ResourceOverview = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingResourceId, setEditingResourceId] = useState(null);

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "tutorial",
    link: "",
    tags: "",
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get("/resources/resource");
      setResources(res.data);
    } catch (err) {
      console.error("Error fetching resources:", err);
    }
  };

  const handleSaveResource = async () => {
    try {
      const payload = {
        ...newResource,
        // Split tags string into an array, trim whitespace from each tag
        tags: newResource.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      if (isEditMode) {
        // Update existing resource
        await api.put(`/resources/resource/${editingResourceId}`, payload);
        // Refresh the list after update
        fetchResources();
      } else {
        // Create new resource
        const res = await api.post("/resources/resource", payload);
        // Add the newly created resource to the state
        setResources([...resources, res.data]);
      }

      // Reset modal state and form fields
      resetModal();
    } catch (err) {
      console.error(
        "Error saving resource:",
        err.response?.data || err.message
      );
      // Display a user-friendly error message using a custom modal/message box
      // instead of alert() as per instructions.
      // For this example, we'll log to console.
      console.log(
        "Failed to save resource:",
        err.response?.data?.error || "Unknown error."
      );
    }
  };

  const handleEditClick = (resource) => {
    setIsEditMode(true);
    setEditingResourceId(resource._id);
    setNewResource({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      link: resource.link,
      // Join tags array back to a comma-separated string for the input field
      tags: resource.tags.join(", "),
    });
    setShowModal(true);
  };

  const handleDeleteResource = async (id) => {
    // Use a custom modal for confirmation instead of window.confirm()
    // For this example, we'll log to console.
    console.log("Confirm deletion of resource ID:", id);
    if (!window.confirm("Are you sure you want to delete this resource?"))
      return; // Placeholder for custom modal

    try {
      await api.delete(`/resources/resource/${id}`);
      // Filter out the deleted resource from the state
      setResources(resources.filter((resource) => resource._id !== id));
    } catch (err) {
      console.error("Error deleting resource:", err);
      // In a real app, you might show an error message to the user
    }
  };

  const resetModal = () => {
    setShowModal(false);
    setIsEditMode(false);
    setEditingResourceId(null);
    setNewResource({
      title: "",
      description: "",
      type: "tutorial",
      link: "",
      tags: "",
    });
  };

  // Filter and sort resources based on current state
  const filteredResources = resources
    .filter(
      (resource) =>
        // Filter by type
        (!typeFilter || resource.type === typeFilter) &&
        // Filter by tag (checks if any of the resource's tags include the filter tag)
        (!tagFilter || resource.tags.includes(tagFilter)) &&
        // Filter by search term in title
        resource.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by newest or oldest creation date
      return sortBy === "Newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="ro-resource-overview">
      <div className="ro-resource-header">
        <h2 className="ro-resource-title">Resources Management</h2>
        <button
          className="ro-add-resource-button"
          onClick={() => setShowModal(true)}
        >
          + Add Resource
        </button>
      </div>

      <div className="ro-filters-container">
        <div className="ro-filters">
          <select
            className="ro-filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Type ▼</option>
            <option value="tutorial">tutorial</option>
            <option value="book">book</option>
            <option value="course">course</option>
            <option value="article">article</option>
          </select>
          <select
            className="ro-filter-select"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="">Tag</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Coding">Coding</option>
          </select>

          {/* <select className="ro-filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Newest</option>
            <option>Oldest</option>
          </select> */}
        </div>
        <div className="ro-search-bar">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="ro-resource-grid">
        {filteredResources.map((resource) => (
          <div key={resource._id} className="ro-resource-card">
            <div className="ro-resource-card-header">
              <h3 className="ro-resource-card-title">{resource.title}</h3>
              <div className="ro-card-actions">
                <button
                  className="ro-edit-btn"
                  onClick={() => handleEditClick(resource)}
                >
                  Edit
                </button>
                <button
                  className="ro-delete-btn"
                  onClick={() => handleDeleteResource(resource._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="ro-resource-detail">Type: {resource.type}</p>
            <p className="ro-resource-detail">
              Tags: {resource.tags.join(", ")}
            </p>
            <p className="ro-resource-detail">
              Description: {resource.description}
            </p>
            <p className="ro-resource-detail">
              <a href={resource.link} target="_blank" rel="noopener noreferrer">
                Open Resource
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Resource */}
      {showModal && (
        <div className="ro-modal-container">
          <div className="ro-modal">
            <h2>{isEditMode ? "Edit Resource" : "Add New Resource"}</h2>
            <input
              type="text"
              placeholder="Title"
              value={newResource.title}
              onChange={(e) =>
                setNewResource({ ...newResource, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={newResource.description}
              onChange={(e) =>
                setNewResource({ ...newResource, description: e.target.value })
              }
            />
            <select
              value={newResource.type}
              onChange={(e) =>
                setNewResource({ ...newResource, type: e.target.value })
              }
            >
              <option value="tutorial">tutorial</option>
              <option value="book">book</option>
              <option value="course">course</option>
              <option value="article">article</option>
            </select>
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newResource.tags}
              onChange={(e) =>
                setNewResource({ ...newResource, tags: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Link"
              value={newResource.link}
              onChange={(e) =>
                setNewResource({ ...newResource, link: e.target.value })
              }
            />
            <div className="ro-modal-actions">
              <button className="ro-save-btn" onClick={handleSaveResource}>
                Save
              </button>
              <button className="ro-cancel-btn" onClick={resetModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceOverview;


