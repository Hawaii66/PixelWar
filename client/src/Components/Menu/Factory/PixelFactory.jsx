import React,{useState} from 'react'

import factory from "../../../Images/Factory.png";

function PixelFactory() {
    const [factoryCount, setCount] = useState(1);
    const factoryProduces = 2;

    const buyFactory = ()=>{
        setCount(prev=>prev+1);
    } 

    return (
        <div className="PixelFactory">
            <h3>{"Factories: " + factoryCount}</h3>
            <h3>{"Factory Pixels: " + (factoryCount * factoryProduces) + " / h"}</h3>
            <div className="Factories">{[...Array(factoryCount)].map((item,index)=>{
                if(index >= 5){return(null)}
                return(<img className="FactoryImage" src={factory} alt="Factory" key={index}/>)

            })}</div>
            <button onClick={()=>buyFactory()}>Buy Factory</button>
        </div>
    )
}

export default PixelFactory
