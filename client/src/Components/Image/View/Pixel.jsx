import React ,{useEffect}from 'react'

import "./Pixel.css";

function Pixel({color, x, y, setPixels, currentColor, socket}) {
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
        /*fetch("http://localhost:5000/Create/Pixel/"+x+"/"+y,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "content-type":"application/json"
            }
        }).then(r=>r.json())
        .then(result=>{
            setPixels(result);
        })*/
    }

    return (
        <>
            <div onClick={()=>updatePixel()} className={"Pixel " + color}></div>
        </>
    )
}

export default React.memo(Pixel)
