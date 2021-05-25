import React from 'react'

import PixelFactory from "./PixelFactory.jsx";
import ColorFactory from "./ColorFactory.jsx";

function Factory() {
    return (
        <div className="Factory">
            <PixelFactory/>
            <ColorFactory/>
        </div>
    )
}

export default Factory
