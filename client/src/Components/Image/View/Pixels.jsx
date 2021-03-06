import React,{useEffect,useState} from 'react'
import {colorsHex, colorToHEX} from "../../../Colors/AllColors.jsx";
import PinchZoomPan from "react-image-zoom-pan";

import "./Pixel.css";

// Convert color text to color RGBA
function ColorToRGBA(color){
    let done = [255,255,0,255];
    return colorToHEX(color);

    /*
    if(color === "White"){
        done = [236,240,241,255];
    }
    if(color === "Black"){
        done = [44,62,80,255];
    }
    if(color === "Red"){
        done = [232,30,14,255];
    }
    if(color === "Blue"){
        done = [41,128,185,255];
    }
    if(color === "Yellow"){
        done = [241,196,15,255];
    }
    if(color === "Green"){
        done = [39,174,96,255];
    }
    return done;*/
}

function PixelsView({color, refresh, pixels, setPixels,socket}) {
    const [image, setImage] = useState(null);
    
    useEffect(()=>{
        console.log(pixels);
        if(pixels === undefined){return(<div>Loading Image...</div>)}
        if(pixels.length <= 2){return(<div>Loading Image...</div>)}
        if(pixels[0].length <= 3){return(<div>Loading Image...</div>)}
        if(pixels[0][0] === undefined){return(<div>Loading Image...</div>)}
        if(pixels[0][0] === null){return(<div>Loading Image...</div>)}
        // create an offscreen canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        // size the canvas to your desired image
        canvas.width = 100;
        canvas.height = 100;

        // get the imageData and pixel array from the canvas
        var imgData = ctx.getImageData(0, 0, 100, 100);
        var data = imgData.data;

        let xCount = 0;
        let yCount = 0;
        // manipulate some pixel elements
        for (var i = 0; i < data.length; i += 4) {
            data[i    ] = ColorToRGBA(pixels[yCount][xCount])[0];
            data[i + 1] = ColorToRGBA(pixels[yCount][xCount])[1];
            data[i + 2] = ColorToRGBA(pixels[yCount][xCount])[2];
            data[i + 3] = ColorToRGBA(pixels[yCount][xCount])[3]; // make this pixel opaque
            xCount += 1;
            if(xCount === 100){
                console.log("Increment");
                xCount = 0;
                yCount += 1;
            }
        }

        // put the modified pixels back on the canvas
        ctx.putImageData(imgData, 0, 0);

        // create a new img object
        var image = new Image();

        // set the img.src to the canvas data url
        image.src = canvas.toDataURL();
        let img = canvas.toDataURL("canvas/jpeg");

        // append the new img object to the page
        setImage(image);
        //document.body.appendChild(image);
        //if(document.getElementsByClassName("PixelWrapperView").length === 0){return;}
        //document.getElementsByClassName("PixelWrapperView")[0].innerHTML = ""
        //document.getElementsByClassName("PixelWrapperView")[0].appendChild(image);
        //console.log(image.src);
        //document.getElementById("zoom-img").style.backgroundImage = 'url('+img+')';
        document.getElementById("PixelImage").src = image.src;
    },[pixels])

    return (
        <div className="PixelWrapperView">
            <div style={{ width: '100%', height: '100%' }}>
                <PinchZoomPan maxScale={5} position="topLeft">
                    <img id="PixelImage" alt='Test Image' />
                </PinchZoomPan>
            </div>
        </div>
    )
}

export default PixelsView
