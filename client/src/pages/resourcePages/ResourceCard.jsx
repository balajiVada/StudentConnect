// import React, { useState } from 'react';
// import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
// import './ResourcePage.css';

// const ResourceCard = ({ resource }) => {
//   const [isSaved, setIsSaved] = useState(false);

//   const toggleSave = () => {
//     setIsSaved((prev) => !prev);
//   };

//   return (
//     <div className="rp-card">
//       <h3 className="rp-card-title">
//         {resource.title}
//         {resource.isPreferred && (
//           <span className="rp-recommended">Recommended</span>
//         )}
//       </h3>

//       <p className="rp-card-desc">{resource.description}</p>

//       <div className="rp-details">
//         <div className="rp-detail-row">
//           <strong>Type:</strong> <span className="rp-type">{resource.type}</span>
//         </div>

//         <div className="rp-detail-row">
//           <strong>Tags:</strong>
//           <div className="rp-card-tags">
//             {resource.tags.map((tag, index) => (
//               <span key={index} className="rp-card-tag">{tag}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="rp-card-actions">
//         <a
//           href={resource.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="rp-card-link"
//         >
//           View Resource
//         </a>

//         <button
//           className="rp-save-button"
//           onClick={toggleSave}
//           aria-label={isSaved ? 'Unsave Resource' : 'Save Resource'}
//         >
//           {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResourceCard;


import React, { useState } from 'react';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import api from '../../services/api'; // ✅ Make sure you import your API service
import './ResourcePage.css';

const ResourceCard = ({ resource, userId }) => {
  const [isSaved, setIsSaved] = useState(resource.isSaved || false);
  const [loading, setLoading] = useState(false);
  console.log(resource.isSaved);

  const toggleSave = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      if (isSaved) {
        // Unsave resource
        await api.delete(`bookmarks/Resource/${resource._id}`);
      } else {
        // Save resource
        let response = await api.post(`/bookmarks/Resource/${resource._id}`);
      }
      setIsSaved((prev) => !prev); // Optimistic update
    } catch (error) {
      console.error("Error toggling save:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-card">
      <h3 className="rp-card-title">
        {resource.title}
        {resource.isPreferred && (
          <span className="rp-recommended">Recommended</span>
        )}
      </h3>

      <p className="rp-card-desc">{resource.description}</p>

      <div className="rp-details">
        <div className="rp-detail-row">
          <strong>Type:</strong> <span className="rp-type">{resource.type}</span>
        </div>

        <div className="rp-detail-row">
          <strong>Tags:</strong>
          <div className="rp-card-tags">
            {resource.tags.map((tag, index) => (
              <span key={index} className="rp-card-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="rp-card-actions">
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="rp-card-link"
        >
          View Resource
        </a>

        <button
          className="rp-save-button"
          onClick={toggleSave}
          disabled={loading}
          aria-label={isSaved ? 'Unsave Resource' : 'Save Resource'}
        >
          {isSaved ? <BsBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
