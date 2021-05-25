import React,{useState} from 'react'

import "./Factory.css";

function ColorFactory() {
    const colors = ["White","Black","Red","Blue","Yellow","Green","Purple","Gold"]
    const [unlockedColors,setUnlocedColors] = useState(2);
    const [colorPrice, setColorPrice] = useState(100);
    const increaeCost = 1.8;

    const unlockPixel = ()=>{
        setColorPrice(prev=>parseInt(prev*increaeCost));
        setUnlocedColors(prev=>prev+1);
    }
    
    return (
        <div className="ColorFactory">
            <h3>{"Unlocked Colors: " + "3" + " / 15"}</h3>
            <div className="UnlockedColors">
                {[...Array(unlockedColors)].map((item, index)=>{
                    return(<div className={"Color " + colors[index]} key={index}></div>)
                })}
            </div>
            {unlockedColors < (colors.length) ? <button onClick={()=>unlockPixel()}>{"Unlock Color " + colorPrice  + " pixlar"}</button> : <h2>All colors unlocked</h2>}
        </div>
    )
}

export default ColorFactory
