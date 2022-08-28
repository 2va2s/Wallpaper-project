import { useEffect, useState } from 'react';
import './LoginSpotify.css';
import { Link } from 'react-router-dom'




function LoginSpotify() {
  console.log(window.location.href)


  const [token, setToken] = useState("")


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
      </header>
    </div>
  );

}


export default LoginSpotify;
