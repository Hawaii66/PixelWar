import React from 'react'

import "./Info.css";

function Info({viewing, setViewing}) {
    return (
        <div className="Info">
            <h2>Pixels:</h2>
            <h3>Total Pixels: 150</h3>
            <h3>New Pixels: 20 / h</h3>
            <button onClick={()=>setViewing(prev=>!prev)}>Place Pixel</button>
        </div>
    )
}

export default Info
