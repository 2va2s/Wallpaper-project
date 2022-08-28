import React from 'react'
import './SettingsCard.css'
import Sett1 from './CreationSettings/Sett1'

export default function SettingsCard(props) {
    return (
        <div id="settings-card">
            <div id="settings-title"><button>a</button><p className="no-margin">{props.title}</p><button>a</button></div>
            {/* <div id="settings-content">{props.settings}</div> */}
            <div id="settings-content"><Sett1 setImgPerRow={props.setImgPerRow} setCurrentWidth={props.setCurrentWidth} setCurrentHeight={props.setCurrentHeight}></Sett1></div>
        </div>
    )
}
