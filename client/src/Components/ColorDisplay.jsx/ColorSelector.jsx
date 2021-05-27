import React,{useState} from 'react'

import Color from "./Color.jsx";

import "./ColorSelector.css";

import {colors} from "../../AllColors.jsx";

// Renderer for the colors on the bottom of the screen
function ColorSelector({setColor, info}) {
    console.log("---",colors);
    const [current,setCurrent] = useState(0);

    const changeColor = (newColor, index)=>{
        setCurrent(index);
        setColor(newColor);
    }

    return (
        <div>
            <div className="ColorWrapper">
                {colors.map((color, index)=>{
                    console.log(info.colors);
                    if(index >= info.colors){return(<></>)}
                    return(<Color color={color} current={current} setCurrent={changeColor} index={index} key={index}/>)
                })}
                {/*<Color color="Black" current={current} setCurrent={changeColor} index={0}/>
                <Color color="Red" current={current} setCurrent={changeColor} index={1}/>
                <Color color="Blue" current={current} setCurrent={changeColor} index={2}/>
                <Color color="Yellow" current={current} setCurrent={changeColor} index={3}/>
                <Color color="Green" current={current} setCurrent={changeColor} index={4}/>
            <Color color="White" current={current} setCurrent={changeColor} index={5}/>*/}
            </div>
        </div>
    )
}

export default ColorSelector
