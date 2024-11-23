import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate(); // Navigate after successful edit

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [message, setMessage] = useState('');

  // Fetch current blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/blog/get/${id}`);
        setFormData({
          title: response.data.title,
          content: response.data.content,
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
        setMessage('Error loading blog data. Please try again.');
      }
    };
    fetchBlog();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const editBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/blog/update/${id}`, formData);
      if (response.status === 200) {
        setMessage('Blog updated successfully!');
        setTimeout(() => navigate('/blogs'), 2000); // Redirect to blogs list
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      setMessage(error.response?.data?.message || 'Error updating blog. Please try again.');
    }
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1 className='text-3xl mb-5'>Edit Blog</h1>
      <form onSubmit={editBlog} className='flex flex-col gap-5'>
       
<div className='flex gap-5'>

   <label className='text-2xl'>Title :</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mb-4 px-2 py-1 border-gray-500 border"
        />
</div>
        <div className='flex gap-5'>
 <label className='text-2xl'>Content :</label>
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          className="mb-4 px-2 py-1 border-gray-500 border"
        />
        </div>
       
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <Link className='py-3 px-6 bg-blue-400 text-white rounded-md' to={"/manage"}>
      go back
      </Link>

      </form>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default Edit;
