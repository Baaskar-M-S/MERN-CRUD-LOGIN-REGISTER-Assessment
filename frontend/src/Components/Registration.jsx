import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      setMessage("Error during registration. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col">
          <h1 className="text-5xl font-serif text-center mb-5">Registration</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-3xl font-serif"
          >
            
            <input
            placeholder="Name"
              value={formData.name}
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
              className="mb-4 px-2 py-1 border-gray-600 border"
            />
            <input
            placeholder="Email"
              value={formData.email}
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
              className="mb-4 px-2 py-1 border-gray-600 border"
            />
            <input
            placeholder="Password"
              value={formData.password}
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              required
              className="mb-4 px-2 py-1 border-gray-600 border"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
            >
              Submit
            </button>
          </form>
          {message && (
            <p className="text-lg font-bold mt-4 text-red-500">{message}</p>
          )}
          <Link to="/login" className="text-blue-700 text-lg mt-4 underline">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
