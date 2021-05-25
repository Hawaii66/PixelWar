import React,{useState} from 'react'

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
        <div>
            <h2>Unlocked Colors:</h2>
            <div className="PixelWrapper">
                {[...Array(unlockedColors)].map((item, index)=>{
                    return(<div className={"Pixel " + colors[index]} key={index}></div>)
                })}
            </div>
            {unlockedColors < (colors.length) ? <button onClick={()=>unlockPixel()}>{"Unlock Color " + colorPrice  + " pixlar"}</button> : <h2>All colors unlocked</h2>}
        </div>
    )
}

export default ColorFactory
