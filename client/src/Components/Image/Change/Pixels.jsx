import React,{useEffect,useState} from 'react'
import PinchZoomPan from "react-image-zoom-pan";

import Pixel from "./Pixel.jsx";

function ColorToRGBA(color){
    let done = [255,255,0,255];

    if(color === "White"){
        done = [255,255,255,255];
    }
    if(color === "Black"){
        done = [0,0,0,255];
    }
    if(color === "Red"){
        done = [255,0,0,255];
    }
    if(color === "Blue"){
        done = [0,255,0,255];
    }
    if(color === "Yellow"){
        done = [255,255,0,255];
    }
    if(color === "Green"){
        done = [0,255,255,255];
    }
    return done;
}

function PixelsChange({color, refresh, pixels, setPixels,socket}) {
    const [image, setImage] = useState(null);
    

    // If the socket connection takes longer display nothing
    if(pixels.length === 0){
        return(
            <div> The image is soon coming </div>
        )
    }

    // Create a grid of pixels the array is [["White","White","White"],["White","White","White"],["White","White","White"]]
    return (
        <div className="PixelWrapperChangeBig">
            <div style={{ width: '100%', height: '100%' }}>
                <PinchZoomPan maxScale={5} position="topLeft">
                    <div className="PixelWrapperChange">
                        {pixels.map((item,x)=>{
                            return(item.map((pixel, y)=>{
                                return(<Pixel socket={socket} key={y} color={pixel} x={x} y={y} setPixels={setPixels} currentColor={color}/>)
                            }))
                        })}
                    </div>
                </PinchZoomPan>
            </div>
            
        </div>
    )
}

export default PixelsChange
