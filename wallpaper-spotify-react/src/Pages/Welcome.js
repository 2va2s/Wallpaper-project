// import { useEffect, useState } from 'react';
import './Welcome.css'
import { Link } from 'react-router-dom'

function Welcome() {

    return (
        <div id="container">
            <div id="menu">
                <Link id="link1" to="/external-spotify">LIER SON COMPTE SPOTIFY</Link>
                <Link id="link2" to="/select-design">Continuer Sans Connexion</Link>
            </div>
        </div>
    )
}

export default Welcome
