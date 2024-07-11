import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./CSS/style.css";
import Favorites from "./Components/Favorites";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ViewMovie from './Components/ViewMovie';
import AddMovie from './Components/AddMovie';
import Login from './Components/Login';
import Registration from './Components/Registration';
import { Navigate } from 'react-router-dom';

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('usertoken');
    if (token) {
      setUserToken(token);
    }
  }, []);

  const handleLoginSuccess = (token) => {
    setUserToken(token);
    localStorage.setItem('usertoken', token);
  };

  return (
    <div>
      <Header userToken={userToken} setUserToken={setUserToken}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="registration" element={<Registration />} />
        {userToken? (
          <>
            <Route path="addmovie" element={<AddMovie />} />
            <Route path="favorites" element={<Favorites />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="viewmovie/:id" element={<ViewMovie />} />
      </Routes>
    </div>
  );
}

export default App;