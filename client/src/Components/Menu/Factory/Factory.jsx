import React from 'react'

import PixelFactory from "./PixelFactory.jsx";
import ColorFactory from "./ColorFactory.jsx";

function Factory() {
    return (
        <div className="Factory">
            <h2>Factories</h2>
            <PixelFactory/>
            <h2>Colors</h2>
            <ColorFactory/>
        </div>
    )
}

export default Factory
