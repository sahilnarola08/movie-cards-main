import React, { useState, useEffect } from 'react';
import { getMovies, updateMovie } from "../APIStorage/api";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response?.movies);
      } catch (error) {
        setError(error);
      }
    };
    fetchMovies();
  }, []);

  const handleFavorite = async (id) => {
    const usertoken = localStorage.getItem('usertoken');
    if (!usertoken) {
      navigate('/login');
      return;
    }
    try {
      await updateMovie(id, { isFavorite: !movies.find((item) => item._id === id).isFavorite });
      setMovies(movies.map((item) => item._id === id ? { ...item, isFavorite: !item.isFavorite } : item));
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (id) => {
    navigate(`/viewmovie/${id}`)
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-300 to-yellow-200 flex justify-center items-center">
      <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-5 gap-5 space-y-4 md:space-y-0">
        {movies.map((item, index) => {
          return (
            <div key={index} className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
              <div className="relative">
                <img className="w-full rounded-xl cursor-pointer" src={item.Poster} alt="Colors" onClick={() => { handleComment(item._id) }} />
                {localStorage.getItem('usertoken') && item.isFavorite && (
                  <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">Favorite</p>
                )}
              </div>
              <div className='flex justify-between'>
                <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{item.Title}</h1>
                <div className='mt-5 cursor-pointer' onClick={() => { handleFavorite(item._id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 40 40">
                    <path fill={localStorage.getItem('usertoken') ? (item.isFavorite ? "#F4FF50" : "#dff0fe") : "#dff0fe"} d="M20 31.441L8.5 37.191 8.5 2.5 31.5 2.5 31.5 37.191z"></path>
                    <path fill={localStorage.getItem('usertoken') ? (item.isFavorite ? "#515300" : "#4788c7") : "#4788c7"} d="M31,3v33.382l-10.553-5.276L20,30.882l-0.447,0.224L9,36.382V3H31 M32,2H8v36l12-6l12,6V2L32,2z"></path>
                  </svg>
                </div>
              </div>
              <div className="my-4">
                <div className="flex space-x-1 items-center">
                  <span className='mt-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                 </span>
                  <p>{item.Runtime} minute</p>
                </div>
                <div className="flex space-x-1 items-center">
                  <span className='mb-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mb-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <p>{item.Description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home