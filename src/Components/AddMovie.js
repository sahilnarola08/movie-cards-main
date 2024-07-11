import React, { useState } from 'react';
import { addMovie } from "../APIStorage/api";
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    Title: '',
    Runtime: '',
    Year: '',
    Description: '',
    Poster: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addMovie(movieData);
      if(response)
      {
        alert('Movie added successfully!');
        navigate(`/`)
      }

    } catch (error) {
      console.error(error);
      alert('Error adding movie!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="font-bold text-center text-2xl mb-5">Movie Listing App Login</h1>  
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Title</label>
          <input
            type="text"
            name="Title"
            placeholder='Enter movie title'
            className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            value={movieData.Title}
            onChange={handleInputChange}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Runtime</label>
          <input
            type="text"
            name="Runtime"
            placeholder='Enter movie runtime'
            className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            value={movieData.Runtime}
            onChange={handleInputChange}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Year</label>
          <input
            type="text"
            name="Year"
            placeholder='Enter movie year'
            className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            value={movieData.Year}
            onChange={handleInputChange}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Description</label>
          <input
            type="text"
            name="Description"
            placeholder='Enter movie description'
            className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            value={movieData.Description}
            onChange={handleInputChange}
          />
          <label className="font-semibold text-sm text-gray-600 pb-1 block">Poster</label>
          <input
            type="text"
            name="Poster"
            placeholder='Enter movie poster link'
            className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
            value={movieData.Poster}
            onChange={handleInputChange}
          />
          <button type="button" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" onClick={handleSubmit}>
              <span className="inline-block mr-2">Add Movie</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddMovie;