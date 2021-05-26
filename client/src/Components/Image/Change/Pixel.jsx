import React ,{useEffect}from 'react'

import "./Pixel.css";

function Pixel({color, x, y, setPixels, currentColor, socket}) {
    // Click on a pixel to update the color to the current color
    const updatePixel = () => {

        const data = {
            color:currentColor,
            user:null
        }
        const socketData = {
            x:x,
            y:y,
            color:currentColor,
            user:null
        }
        console.log("Create Pixel");
        socket.emit("CreatePixel", socketData);
    }

    const changeBackgroundColor = (e)=>{
        e.target.style.background = currentColor.toString();
    }
    const changeBackgroundColorFalse = (e)=>{
        e.target.style.background = "";
    }

    return (
        <>
            <div onClick={()=>updatePixel()} onMouseLeave={changeBackgroundColorFalse} onMouseOver={changeBackgroundColor} className={"Pixel " + color}></div>
        </>
    )
}

export default React.memo(Pixel)
