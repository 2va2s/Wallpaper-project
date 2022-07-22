import React from 'react'
import './SelectDataModel.css'
import Button from './GreenButton.js'
import { useLocation } from 'react-router-dom'

export default function SelectDataModel() {
    const location = useLocation()
    const setDataModel = (data) => {
        let struc = JSON.parse(JSON.stringify(location.state))
        struc["data-model"] = data
        return struc
    }

    return (
        <div id="step-container" >
            <h1>Créer un fond d’écran à partir de:</h1>
            <div id="choice-container">
                <Button url="/from-when" title="Vos Top Tracks" data={setDataModel('Tracks')} />
                <Button url="/from-when" title="Vos Top Artists" data={setDataModel('Artists')} />
                <Button url="/from-playlist" title="Une Playlist" data={location.state} />
                <Button url="/from-custom" title="Création Personnalisée" data={location.state} />
            </div>
        </div>
    )
}
