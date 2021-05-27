import React from 'react'

import Info from "./Info/Info.jsx";
import Factory from "./Factory/Factory.jsx";
import User from "../User.jsx";

function Menu({viewing, setViewing, user, setUser, info, socket}) {
    
    return (
        <div className="Menu">
            <h1 className="Header">Pixel War</h1>
            <User user={user} setUser={setUser} socket={socket}/>
            <Info viewing={viewing} setViewing={setViewing} info={info}/>
            <Factory info={info} socket={socket}/>
        </div>
    )
}

export default Menu
