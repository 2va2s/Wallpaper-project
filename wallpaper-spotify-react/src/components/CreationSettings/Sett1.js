import React, { useState } from 'react'
import './Sett1.css'

export default function Sett1({ setImgPerRow, setCurrentWidth, setCurrentHeight }) {
    const [currentImgPerRow, setcurrentImgPerRow] = useState('4')
    const [checked, setChecked] = useState(true);
    // const [currentWidth, setCurrentWidth] = useState(window.screen.width)

    const changeImgPerRow = (newNumber) => {
        setcurrentImgPerRow(newNumber)
        setImgPerRow(newNumber)
    }
    const changeCkeckState = () => {
        console.log("ca flingue")
        setChecked(!checked)
        if (!checked) {
            console.log("ca rentre ")
            setCurrentWidth(window.screen.width)
            setCurrentHeight(window.screen.height)
            document.getElementById("i1").value = window.screen.width
            document.getElementById("i2").value = window.screen.height
        }
    }
    return (
        <div>
            <p className="no-margin">Résolution:</p>
            <form>
                <div id="dim-line">
                    <div id="inputs-dim">
                        <input id="i1" className="input-dim" defaultValue={window.screen.width} onChange={(event) => {
                            setCurrentWidth(event.target.value)
                            setChecked(false)
                            // changeCkeckState()
                        }} ></input>
                        <p className="no-margin">x</p>
                        <input id="i2" className="input-dim" defaultValue={window.screen.height} onChange={(event) => {
                            setCurrentHeight(event.target.value)
                            // changeCkeckState()
                            setChecked(false)
                        }
                        }></input>
                    </div>
                    <div id="is-automatic">
                        <input type="checkbox" checked={checked} onChange={() => changeCkeckState()} ></input>
                        <p className="no-margin">automatique</p>
                    </div>
                </div>
                <p className="no-margin">Images par ligne</p>

                <select
                    id="marcheSTP"
                    onChange={(event) => changeImgPerRow(event.target.value)}
                    value={currentImgPerRow}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </form>

        </div>
    )
}
