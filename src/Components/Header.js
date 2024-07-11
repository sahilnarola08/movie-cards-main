import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from "../APIStorage/api";

const Header = ({ userToken, setUserToken }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState()
  const [error, setError] = useState(null);

  let userId = null;

  useEffect(()=>{
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      userId = decodedToken._id;
    }
  },[userToken])

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    setUserToken('');
    navigate('/login');
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getUserById(userId);
        setUsers(response);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovies();
  }, [userId]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center bg-[#5F9EA0] text-[#F5DEB3]">
      <div className="flex-1">
        <h1 className="m-0 p-5 text-3xl font-bold">Movie Listing App</h1>
      </div>
      <div className="flex justify-end gap-5 mr-5">
        {userToken? (
          <>
          {users?.user && (
            <a className='text-lg font-bold p-2 my-5'>Hello, {users?.user?.username}</a>
          )}
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/")}>Home</button>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/favorites")}>Favorites</button>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/addmovie")}>Add Movie</button>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/")}>Home</button>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/registration")}>Registration</button>
            <button className="bg-[#F5DEB3] text-[#5F9EA0] text-lg font-bold p-2 my-5 rounded hover:bg-[#77C8CB] hover:text-[#FFFFFF]" onClick={() => navigate("/login")}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;