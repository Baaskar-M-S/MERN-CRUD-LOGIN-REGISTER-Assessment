import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/getall");
        setBlogs(response.data); // Update state with blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Unable to fetch blogs. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once request is complete
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Blogs</h1>

<div className="mt-5 mb-5 flex flex-row gap-3">
  <Link className="text-white bg-blue-500 px-6 py-3 rounded-lg" to={'/manage'}>
Manage
</Link>
<Link className="text-white bg-blue-500 px-6 py-3 rounded-lg" to={'/login'}>
Login</Link>
<Link className="text-white bg-blue-500 px-6 py-3 rounded-lg" to={'/Registration'}>
Register</Link>
<Link className="text-white bg-blue-500 px-6 py-3 rounded-lg" to={'/logout'}>
Logout</Link>
</div>
      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && blogs.length === 0 && (
        <p className="text-gray-500">No blogs available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
            <p className="text-gray-600 mt-2 line-clamp-3">
              {blog.content}
            </p>
            <Link
              to={`/view/${blog._id}`}
              className="text-blue-500 mt-4 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
