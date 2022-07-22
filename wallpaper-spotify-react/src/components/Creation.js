import { useEffect, useState } from 'react';
import './Creation.css';
import axios from 'axios'


function Creation() {
    console.log(window.location.href)
    const CLIENT_ID = "b4d1e91f967e42feab5fdbf5f458b0ec"
    const REDIRECT_URI = window.location.href.includes("localhost") ? "http://localhost:3000/login-spotify" : "https://cute-bushes-open-46-193-64-63.loca.lt"
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
                <h1>Monthly Wallpaper</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-recently-played%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-read-collaborative&show_dialog=true`}>Login to Spotify</a>
                    :
                    <p>conneté</p>}

                {token ?

                    <div>
                        <p>rempli ca pd</p>
                        <button onClick={fetchTopTracks}>vide</button>
                        <button onClick={buildWallpaper}>Build Wallpaper</button>
                    </div>
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
var c = document.getElementById("11");
console.log("c:" + c)

export default Creation;
