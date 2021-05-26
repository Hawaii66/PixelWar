import React from 'react'

import Info from "./Info/Info.jsx";
import Factory from "./Factory/Factory.jsx";

function Menu({viewing, setViewing}) {
    return (
        <div className="Menu">
            <h1 className="Header">Pixel War</h1>
            <Info viewing={viewing} setViewing={setViewing}/>
            <Factory/>
        </div>
    )
}

export default Menu
