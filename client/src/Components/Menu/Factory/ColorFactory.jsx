import React,{useState, useEffect} from 'react'

import {colors} from "../../../Colors/AllColors.jsx";

import "./Factory.css";

function ColorFactory({info, socket}) {
    const [unlockedColors,setUnlocedColors] = useState(2);
    const [colorPrice, setColorPrice] = useState(100);
    const increaeCost = 1.8;

    const unlockPixel = ()=>{
        if(info.pixels >= colorPrice){
            socket.emit("PurchaseColor",{price:colorPrice});
            setColorPrice(prev=>parseInt(prev*increaeCost));
            setUnlocedColors(prev=>prev+1);
        }
    }

    useEffect(()=>{
        setUnlocedColors(info.colors);

        let currentPrice = 100;
        for(let i = 0; i < info.colors; i++){
            currentPrice = currentPrice * increaeCost;
        }
        setColorPrice(Math.round(currentPrice));
    },[info])
    
    return (
        <div className="ColorFactory">
            <h3>{`Unlocked Colors: ${info.colors} / 15`}</h3>
            <div className="UnlockedColors">
                {[...Array(unlockedColors)].map((item, index)=>{
                    return(<div className={"Color " + colors[index]} key={index}></div>)
                })}
            </div>
            {unlockedColors < (colors.length) ? <button onClick={()=>unlockPixel()}>{"Unlock Color: " + colorPrice  + " pixels"}</button> : <h2>All colors unlocked</h2>}
        </div>
    )
}

export default ColorFactory
