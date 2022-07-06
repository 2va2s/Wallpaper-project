import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'



function App() {
  const CLIENT_ID = "b4d1e91f967e42feab5fdbf5f458b0ec"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [topTracks, setTopTracks] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
      console.log(hash)
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token=")).split("=")[1]
      console.log(token)

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  // const lastMonthSongsData = async (e) => {
  //   const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
  //     headers: { Authorization: `Bearer ${token}` },
  //     params: {}
  //   })
  //   console.log(data)
  // }

  const fetchTopTracks = async () => {
    console.log({ token })
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks/?limit=2", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTopTracks(data.items)
    console.log(topTracks)
  }

  const renderTopTracks = () => {
    if (topTracks != "") {
      console.log(topTracks)
      console.log("pas vide")
      return topTracks.map((track, idx) => {
        return <div key={track.id}><img id={idx} width="300" height="300" src={track.album.images[0].url}></img> </div>
      })
    }
  }

  const buildWallpaper = () => {
    var c = document.getElementById("1");
    console.log(c)
  }


  return (
    <div className="App">
      <header className="App-header">
        <h1>Monthly Wallpaper</h1>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-recently-played%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-read-collaborative&show_dialog=true`}>Login to Spotify</a>
          :
          <button onClick={logout}>Logout</button>}

        {token ?

          <div id="11">
            <p>rempli ca pd</p>
            <button onClick={fetchTopTracks}>vide</button>
            <button onClick={buildWallpaper}>Build Wallpaper</button>
          </div>
          :
          <h2>Please login</h2>
        }
        {renderTopTracks()}
      </header>
    </div>
  );

}
var c = document.getElementById("11");
console.log("c:" + c)

export default App;
