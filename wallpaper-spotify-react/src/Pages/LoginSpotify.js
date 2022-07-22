import { useEffect, useState } from 'react';
import './LoginSpotify.css';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'



function LoginSpotify() {
  console.log(window.location.href)
  const CLIENT_ID = "b4d1e91f967e42feab5fdbf5f458b0ec"
  const REDIRECT_URI = window.location.href.includes("localhost") ? "http://localhost:3000/login-spotify" : "https://cute-bushes-open-46-193-64-63.loca.lt/login-spotify"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState("")
  const [topTracks, setTopTracks] = useState("")

  const deviceWidth = window.screen.width
  const deviceHeight = window.screen.height
  const imageDim = deviceWidth / 4

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
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks/?limit=40", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setTopTracks(data.items)
    console.log(topTracks)
  }

  const renderTopTracks = () => {
    if (topTracks !== "") {
      console.log(topTracks)
      console.log("pas vide")
      return topTracks.map((track, idx) => {
        return <div key={track.id}><img id={idx} width="300" height="300" src={track.album.images[0].url}></img> </div>
      })
    }
  }

  const buildWallpaper = () => {
    var c = document.getElementById("canvaBox");
    console.log(c.src)
    var ctx = c.getContext("2d")
    console.log("topt" + topTracks)
    for (let i in topTracks) {
      console.log("passing", i)
      let img = document.getElementById(i)
      console.log(img)
      // ctx.drawImage(img, i * deviceWidth, i * ((deviceHeight / 4)-1), imageDim, imageDim)
      ctx.drawImage(document.getElementById(i), imageDim * (i % 4), (Math.floor(i / 4)) * imageDim, imageDim, imageDim)
    }
    // ctx.drawImage(document.getElementById("0"), 0, 0, imageDim, imageDim)
    document.getElementById("deviceWidth").innerText = deviceWidth + " " + deviceHeight
  }


  return (
    <div className="App">
      <header className="App-header">
        {/* {!token ?
          // <Navigate to="/external-spotify" /> 
          // <div>pas connecté</div>
          document.props.history.push('/home')
          :
          <button onClick={logout}>Logout</button>} */}

        {token ?
          <>
            <h1>Connexion réussie</h1>
            <Link to="/select-design">Continuer</Link>
            <button onClick={logout}>Logout</button>

          </>
          :
          <div>
            <h2>Please login</h2>
            <p>{window.location.href}</p>
          </div>
        }
        <div id="coverImg">
          {renderTopTracks()}
        </div>
        <p id="deviceWidth"></p>
        <canvas id="canvaBox" height={deviceHeight} width={deviceWidth}></canvas>
      </header>
    </div>
  );

}


export default LoginSpotify;
