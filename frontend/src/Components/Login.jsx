import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData);
      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        navigate("/manage");
      }
    } catch (error) {
      console.error(error);
      setMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex  flex-col gap-3">
          <h1 className="text-5xl font-serif text-center mb-5">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-3xl font-serif"
          >
            <div>
               
            <input
            placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mb-4 px-2 py-1 border-gray-600 border"
            />
            </div>
           
<div> <input
placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mb-4 px-2 py-1  border-gray-600 border"
            /></div>
           

            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Log In
            </button>
          </form>

          {message && (
            <p className="text-red-500 text-lg font-bold mt-4">{message}</p>
          )}

          <Link
            to="/Registration"
            className="text-blue-700 text-lg mt-4 underline"
          >
            Registration
          </Link>
        </div>
      </div>
    </>
  );
};

export default LogIn;
