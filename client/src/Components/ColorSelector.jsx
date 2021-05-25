import React,{useState} from 'react'

import Color from "./Color.jsx";


// Renderer for the colors on the bottom of the screen
function ColorSelector({setColor, setRefresh}) {
    const [current,setCurrent] = useState(0);

    const changeColor = (newColor, index)=>{
        setCurrent(index);
        setColor(newColor);
    }

    const changeRefresh=(event)=>{
        setRefresh(event.target.value);
    }

    return (
        <div>
            <div className="ColorWrapper">
                <Color color="Black" current={current} setCurrent={changeColor} index={0}/>
                <Color color="Red" current={current} setCurrent={changeColor} index={1}/>
                <Color color="Blue" current={current} setCurrent={changeColor} index={2}/>
                <Color color="Yellow" current={current} setCurrent={changeColor} index={3}/>
                <Color color="Green" current={current} setCurrent={changeColor} index={4}/>
                <Color color="White" current={current} setCurrent={changeColor} index={5}/>
            </div>
            <input type="range" min="100" max="5000" name="refreshRate" id="refreshRate" onChange={changeRefresh} />
        </div>
    )
}

export default ColorSelector
