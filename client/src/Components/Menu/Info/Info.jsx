import React from 'react'

import "./Info.css";

function Info({viewing, setViewing, info}) {
    console.log(info);
    console.log("--Info--");
    return (
        <div className="Info">
            <h2>Pixels:</h2>
            <h3>{"Total Pixels: " + info.pixels}</h3>
            <h3>{"New Pixels: " + Math.round(parseFloat(info.standardPixels) + parseFloat(info.factories) * parseFloat(info.factoryMult) * 60) +" / h"}</h3>
            <button onClick={()=>setViewing(prev=>!prev)}>{viewing ? "Place Pixel" : "View Canvas"}</button>
        </div>
    )
}

export default Info
