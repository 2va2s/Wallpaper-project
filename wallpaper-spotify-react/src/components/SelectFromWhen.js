import React from 'react'
import Button from './GreenButton.js'
import { useLocation } from 'react-router-dom'

export default function SelectFromWhen() {
  const location = useLocation()
  const setFromWhen = (data) => {
      let struc = JSON.parse(JSON.stringify(location.state))
      struc["time"] = data
      return struc
  }

  return (
    <div id="step-container" >
      <h1>Créer un fond d’écran à partir de:</h1>
      <div id="choice-container">
        <Button url="/creation" title="Du Mois" data={setFromWhen('Month')} />
        <Button url="/creation" title="Des 6 Derniers mois" data={setFromWhen('HalfYear')} />
        <Button url="/creation" title="All Time" data={setFromWhen('AllTime')} />
      </div>
    </div>
  )
}
