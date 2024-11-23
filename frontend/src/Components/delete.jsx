import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteBlog = () => {
  const { id } = useParams(); // Get blog ID from URL params
   // To navigate to the previous page
  const [message, setMessage] = useState(""); // State for messages

  // Delete a blog
  

  return (
    <>
      <h1>Delete Blog</h1>
      <div className="mt-4">
        {message && (
          <p
            className={`${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            } font-medium mb-4`}
          >
            {message}
          </p>
        )}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mr-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        >
          Go Back
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default DeleteBlog;
