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

    return (
        <>
            <div onClick={()=>updatePixel()} className={"Pixel " + color}></div>
        </>
    )
}

export default React.memo(Pixel)
