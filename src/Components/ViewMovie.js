import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById, updateMovie } from "../APIStorage/api";
import { getUserById } from "../APIStorage/api";
import { jwtDecode } from 'jwt-decode';

const ViewMovie = () => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');

  const token = localStorage.getItem('usertoken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await getUserById(userId);
        setUsername(user?.user.username);
      } catch (error) {
        setError(error);
      }
    };

    fetchUsername();
  }, []);

  const {id} = useParams();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response?.movie);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovie();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = { username, commentmssg: comment };
      const updatedMovie = await updateMovie(id, { Comments: [...movie.Comments, newComment] });
      setMovie(updatedMovie?.movie);
      setComment('');
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
  <>
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="sm:max-w-xl sm:mx-auto mt-10">
        <div className="bg-white shadow-lg border-gray-100 max-h-80	 border sm:rounded-3xl p-8 flex space-x-8">
          <div className="h-150 overflow-visible w-1/2">
              <img className="rounded-3xl shadow-lg w-48 h-6432" src={movie.Poster} alt=""/>
          </div>
          <div className="flex flex-col w-1/2 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-3xl font-bold">{movie.Title}</h2>
              {movie.isFavorite && (
              <div className="bg-yellow-400 font-bold rounded-xl p-2">Favorite</div>
              )}
            </div>
            <div>
              <div className="text-sm text-gray-400">{movie.Runtime} minute</div>
              <div className="text-lg text-gray-800">{movie.Year}</div>
            </div>
              <p className=" text-gray-400 max-h-40 overflow-y-hidden">{movie.Description}</p>
          </div>
        </div>
        <div className='mt-10'>
          <div>
          Comments: 
          {movie.Comments && movie.Comments.map((comment, index) => (
            <p key={index} className='p-3 mt-2 bg-gray-300 rorder-gray-100 rounded-xl w-[580px]'>{comment.username}: {comment.commentmssg}</p>
          ))}
          </div>
          <form onSubmit={handleCommentSubmit}>
            <input type="text" value={comment} onChange={handleCommentChange} placeholder='Write Your Comments Here...' className='p-3 mt-2 bg-white shadow-lg border-gray-100 rounded-xl w-[580px]' />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded">
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
   
  </>
  )
}

export default ViewMovie