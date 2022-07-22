import React from 'react'
import './SelectDesign.css'
import DesignCard from './DesignCard.js'

export default function SelectDesign() {
  return (
    <div id="step-container" >
      <h1>Selectionner un design</h1>
      <div id="choices-container">
        <div>
          <DesignCard name='quadrillage' design='Quadrillage' />
          <DesignCard name='demi-toile' design='DemiToile' />
        </div>
        <div>
          <DesignCard name='toile' design='Toile'/>
        </div>
      </div>
    </div>
  )
}
