import React,{useState} from 'react'

import factory from "../../../Images/Factory.png";

function PixelFactory() {
    const [factoryCount, setCount] = useState(1);
    const factoryProduces = 2;

    const buyFactory = ()=>{
        setCount(prev=>prev+1);
    } 

    return (
        <div>
            <h2>{"Factorys: " + factoryCount}</h2>
            <h2>{"Pixels Generated / h: " + (factoryCount * factoryProduces)}</h2>
            {[...Array(factoryCount)].map((item,index)=>{
                if(index >= 5){return(null)}
                return(<img src={factory} alt="Factory" key={index}/>)

            })}
            <button onClick={()=>buyFactory()}>Buy Factory</button>
        </div>
    )
}

export default PixelFactory
