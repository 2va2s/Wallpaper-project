import { useEffect, useState } from 'react';
import './Creation.css';
import axios from 'axios'
import { useLocation } from "react-router-dom"
import SettingsCard from "./SettingsCard.js"


function Creation() {



    const location = useLocation()
    // console.log(location.state)
    // console.log(window.location.href)


    const CLIENT_ID = "b4d1e91f967e42feab5fdbf5f458b0ec"
    const REDIRECT_URI = window.location.href.includes("localhost") ? "http://localhost:3000/login-spotify" : "https://cute-bushes-open-46-193-64-63.loca.lt"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [topTracks, setTopTracks] = useState("")
    let locationDatas = JSON.parse(JSON.stringify(location.state))
    console.log("strucucucu", locationDatas["time"])
    // const deviceWidth = window.screen.width
    // const deviceHeight = window.screen.height

    const [imagePerRow, setImagePerRow] = useState("")
    const [currentWidth, setCurrentWidth] = useState(window.screen.width)
    const [currentHeight, setCurrentHeight] = useState(window.screen.height)
    const imageDim = currentWidth / imagePerRow

    console.log("marchest:", imagePerRow)

    const renderTopTracks = () => {
        if (topTracks !== "") {
            console.log(topTracks)
            console.log("pas vide")
            return topTracks.map((track, idx) => {
                return <div key={track.id}><img id={idx} alt="cover" width="300" height="300" src={track.album.images[0].url}></img> </div>
            })
        }
    }




    useEffect(() => {
        // console.log("marche stp:", document.getElementById("marcheSTP"))

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


        const fetchTopTracks = async () => {
            console.log("fetching tracks...")
            console.log({ token })
            const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks/?limit=50&time_range=" + locationDatas["time"], {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setTopTracks(data.items)
            console.log(topTracks)

        }

        fetchTopTracks()
        // renderTopTracks()
        const buildWallpaper = () => {
            console.log("building wallpaper...")
            var c = document.getElementById("canvaBox");
            console.log("aaa", document.getElementById('canvaBox'))
            var ctx = c.getContext("2d")
            console.log("topt" + topTracks)
            for (let i in topTracks) {
                if (Math.floor(i / imagePerRow) * imageDim < currentHeight) {
                    ctx.drawImage(document.getElementById(i), imageDim * (i % imagePerRow), (Math.floor(i / imagePerRow)) * imageDim, imageDim, imageDim)
                    console.log(i)
                }
                // console.log("passing", i)
                // let img = document.getElementById(i)

                // console.log(img)
                // ctx.drawImage(img, i * currentWidth, i * ((dev iceHeight / 4)-1), imageDim, imageDim)
                // console.log("---")
                // console.log(i % imagePerRow)
                // console.log(Math.floor(i / imagePerRow)*imageDim > currentHeight)
                // console.log("---")
            }
            // ctx.drawImage(document.getElementById("0"), 0, 0, imageDim, imageDim)
            // document.getElementById("currentWidth").innerText = currentWidth + " " + currentHeight
        }

        buildWallpaper()

    }, [imagePerRow,currentWidth,currentHeight])





    return (
        <div className="App">
            <h1>Personnalisation</h1>
            {/* <p id="currentWidth"></p> */}
            <canvas id="canvaBox" height={currentHeight} width={currentWidth}></canvas>
            {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-read-private%20user-read-recently-played%20user-top-read%20user-follow-read%20playlist-read-private%20playlist-read-collaborative&show_dialog=true`}>Login to Spotify</a>
                :
                <p></p>}
            {token ?

                <div id="settings">
                    < SettingsCard title="Dimensions" setImgPerRow={setImagePerRow} setCurrentWidth={setCurrentWidth} setCurrentHeight={setCurrentHeight} />
                    {/* <button onClick={fetchTopTracks}>vide</button>
                    <button onClick={buildWallpaper}>Build Wallpaper</button> */}
                </div>
                :
                <div>
                    {
                        /*
                        FAIRE REDIRECTION ICI
                        <h2>Please login</h2>
                        <p>{window.location.href}</p> */}
                </div>
            }
            {/* <button onClick={buildWallpaper}>Générer</button> */}
            <div id="coverImg">
                {renderTopTracks()}
            </div>
        </div>
    );

}
// var c = document.getElementById("11");
// console.log("c:" + c)

export default Creation;
