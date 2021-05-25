import React from 'react'

import Info from "./Info/Info.jsx";
import Factory from "./Factory/Factory.jsx";

function Menu() {
    return (
        <div className="Menu">
            <h1>Pixel War</h1>
            <Info/>
            <br />
            <Factory/>
        </div>
    )
}

export default Menu
