import React from 'react'

// Menu color
function Color({color, current, setCurrent, index}) {
    return (
        <div onClick={()=>setCurrent(color, index)} className={"Color " + color + " " + (current === index && "Current")}>
            
        </div>
    )
}

export default Color
