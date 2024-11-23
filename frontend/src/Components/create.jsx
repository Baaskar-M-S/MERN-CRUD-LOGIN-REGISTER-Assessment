import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/blog/create', formData);
      if (response.status === 201) {
        setMessage('Blog created successfully!');
        setFormData({ title: '', content: '' }); // Clear form
      }
    } catch (error) {
      console.error(error);
      setMessage('Error creating blog. Please try again.');
    }
  };

  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <h1 className='text-3xl mb-5'>Create Blog</h1>
      <form onSubmit={createBlog} className='flex-col flex gap-5'>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className='mb-4 px-2 py-1 border border-gray-500 '
        />
        <input
        
          className='mb-4 px-2 py-1 border border-gray-500 '
          type="text"
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />
        <button className='py-3 px-6 bg-blue-400 text-white rounded-md' type="submit">Create</button>
      <Link className='py-3 px-6 bg-blue-400 text-white rounded-md' to={"/manage"}>
      go back
      </Link>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Create;
