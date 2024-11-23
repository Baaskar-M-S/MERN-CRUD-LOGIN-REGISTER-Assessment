
import axios from "axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { TbPointerCheck } from "react-icons/tb";
import { Link, } from "react-router-dom";

const Table = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/getall");
        setBlogs(response.data);
        
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/blog/delete/${id}`
      );
      setMessage(response.data.message || "Blog deleted successfully.");
    } catch (error) {
      console.error("Error deleting blog:", error);
      setMessage("Error deleting blog. Please try again.");
    }
  };
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Blog Management
      </h1>
      <div className="flex flex-row gap-4">
      <Link
        to="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 inline-block"
      >
        Create Blog
      </Link>

<Link className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 inline-block"
       to={"/"}>
Go back
</Link>
      </div>
     
      {message && (
        <p
          className={`${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          } font-medium mb-4`}
        >
          {message}
        </p>
      )}

      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">S.NO</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Content</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr
              key={blog._id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}
            >
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{blog.title}</td>
              <td className="py-2 px-4">{blog.content}</td>
              <td className="py-2 px-4 flex flex-row gap-4">
                <Link to={`/edit/${blog._id}`} className="text-green-500">
                  <CiEdit size={20} />
                </Link>
                <button onClick={()=>handleDelete(blog._id)} className="text-red-500">
                  <MdDelete size={20} />
                </button>
                <Link to={`/view/${blog._id}`} className="text-blue-500">
                  <TbPointerCheck size={20} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
