import React from 'react'
import './GreenButton.css'
import { useNavigate,useLocation } from "react-router-dom"


export default function GreenButton(props) {
  const location = useLocation()
  console.log(location.state)
  const history = useNavigate()
  const faireRedirection = () => {
    let url = props.url
    history(url, { state: props.data })
  }
  return (
    <div className="green-button" onClick={faireRedirection}><p className="text-choice">{props.title}</p></div>
  )
}
