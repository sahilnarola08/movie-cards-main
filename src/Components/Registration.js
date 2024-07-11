import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrationuser } from '../APIStorage/api';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormData({ ...formData, error: 'All fields are required' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, error: 'Password and confirm password do not match' });
      return;
    }
    if (!formData.email.endsWith('@gmail.com')) {
      setFormData({ ...formData, error: 'Email must be a Gmail address' });
      return;
    }
    try {
      const response = await registrationuser(formData);
      if (response?.code === 200) {
        navigate('/login');
      } else {
        setFormData({ ...formData, error: 'Error registering user' });
      }
    } catch (error) {
      setFormData({ ...formData, error: 'Error registering user' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Movie Listing App Registration</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              onClick={handleSubmit}
            >
              <span className="inline-block mr-2">Register</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            {formData.error && <div className="text-red-500">{formData.error}</div>}
          </div>
          <div className="py-5">
            <button
              className="transition duration-200  w-full py-2.5 rounded-lg font-semibold text-center inline-block"
            >
              Have account? : <span className="inline-block text-gray-400 hover:text-gray-800" onClick={() => navigate("/login")}>Login</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;