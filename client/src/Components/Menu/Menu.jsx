import React from 'react'

import Info from "./Info/Info.jsx";
import Factory from "./Factory/Factory.jsx";
import User from "../User.jsx";

function Menu({viewing, setViewing, user, setUser, info}) {
    
    return (
        <div className="Menu">
            <h1 className="Header">Pixel War</h1>
            <User user={user} setUser={setUser}/>
            <Info viewing={viewing} setViewing={setViewing} info={info}/>
            <Factory/>
        </div>
    )
}

export default Menu
