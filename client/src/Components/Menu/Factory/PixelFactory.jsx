import React,{useState, useEffect} from 'react'

import factory from "../../../Images/Factory.png";

function PixelFactory({info, socket}) {
    const [factoryCount, setCount] = useState(1);
    const [factoryPrice, setPrice] = useState(1000);
    const increaseAmount = 2.5;

    const buyFactory = ()=>{
        if(info.pixels >= factoryPrice){
            setCount(prev=>prev+1);
            socket.emit("PurchaseFactory", {price:factoryPrice});
        }
    } 

    useEffect(()=>{
        setCount(info.factories);

        let currentPrice = 500;
        for(let i = 0; i < info.factories; i++){
            currentPrice = currentPrice * increaseAmount;
        }
        setPrice(Math.round(currentPrice));
    },[info])

    return (
        <div className="PixelFactory">
            <h3>{`Factories: ${info.factories}`}</h3>
            <h3>{`Factory Pixels: ${Math.round(info.factories * info.factoryMult * 60)} / h`}</h3>
            <div className="Factories">{[...Array(factoryCount)].map((item,index)=>{
                if(index >= 5){return(null)}
                return(<img className="FactoryImage" src={factory} alt="Factory" key={index}/>)

            })}</div>
            <button onClick={()=>buyFactory()}>{`Buy Factory: ${factoryPrice} pixels`}</button>
        </div>
    )
}

export default PixelFactory
