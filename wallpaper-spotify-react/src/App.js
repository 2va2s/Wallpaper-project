// import { useEffect, useState } from 'react';
import './App.css';
// import axios from 'axios'
import Welcome from './Pages/Welcome.js'
import Login from './Pages/LoginSpotify.js'
import NavBar from './components/Navbar.js'
import SelectDesign from './components/SelectDesign.js'
import SelectDataModel from './components/SelectDataModel.js'
import Creation from './components/Creation.js'
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SelectFromWhen from './components/SelectFromWhen.js'



function App() {
  const CLIENT_ID = "b4d1e91f967e42feab5fdbf5f458b0ec"
  const REDIRECT_URI = window.location.href.includes("localhost") ? "http://localhost:3000/login-spotify" : "https://cute-bushes-open-46-193-64-63.loca.lt/login-spotify"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login-spotify" element={<Login />} />
        <Route path="/external-spotify" element={<SpotifyAuthenticate />} />
        <Route path="/select-design" element={<SelectDesign />} />
        <Route path="/data-model" element={<SelectDataModel />} />
        <Route path='/from-when' element={<SelectFromWhen/>} />
        <Route path='/creation' element={<Creation/>} />
      </Routes>
    </>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path='/welcome' element={<Welcome/>} />
    //     <Route path='/' exact element={<Home/>}/>
    //   </Routes>
    // </Router>
  );
  function SpotifyAuthenticate() {
    window.location.replace(`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-recently-played%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-read-collaborative&show_dialog=true`);
  }
}

export default App;
