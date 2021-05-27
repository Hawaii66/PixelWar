import React from 'react'

import PixelFactory from "./PixelFactory.jsx";
import ColorFactory from "./ColorFactory.jsx";

function Factory({info, socket}) {
    return (
        <div className="Factory">
            <h2>Factories</h2>
            <PixelFactory info={info} socket={socket}/>
            <h2>Colors</h2>
            <ColorFactory info={info} socket={socket}/>
        </div>
    )
}

export default Factory
