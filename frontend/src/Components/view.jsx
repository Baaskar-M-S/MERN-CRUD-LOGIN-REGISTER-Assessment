import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [blog, setBlog] = useState(null); // Initialize as null
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/get/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlog();
  }, [id]); // Include `id` in dependency array

  return (
    <div className="h-screen ">


      
      
      <div className="p-8 bg-gray-50 min-h-screen">
      
  
      {blog ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          
   
      
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-lg">{blog.content}</p>
          <div className="my-10">
            <Link className=' py-3 px-6 bg-blue-400 text-white rounded-md' to={"/manage"}>
        go back</Link> 
          </div>
          </div>
      ) : (
        <p className="text-gray-600">Loading blog...</p>
      )}
    </div>
    </div>
   
  );
};

export default View;
