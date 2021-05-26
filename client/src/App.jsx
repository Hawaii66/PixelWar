import React, {useState,useEffect} from "react"
import socketIOClient from "socket.io-client";

import PixelsView from "./Components/Image/View/Pixels.jsx"
import PixelsChange from "./Components/Image/Change/Pixels.jsx";
import ColorSelector from "./Components/ColorDisplay.jsx/ColorSelector.jsx";
import Menu from "./Components/Menu/Menu.jsx";

import "./App.css"

function App() {
  const [color, setColor] = useState("Black");
  const [refCount, setRefCount] = useState(0);
  const [pixels, setPixels] = useState([[null,null,null],[null,null,null]]);
  const [copySocket, setSocket] = useState(undefined);
  const [canChangePixels, setChange] = useState(true);
  const [isViewing, setViewing] = useState(true);

  useEffect(()=>{

    const socket = socketIOClient("http://localhost:5000");
    setSocket(socket);
    socket.on("ResivedSocket", data => {
      console.log("Succesfull connection with socketIO server", data);
      socket.emit("GetPixels")
    })

    socket.on("Pixels", data=>{
      console.log("Setting Pixels");
      setPixels(data);
    })
  },[])

  useEffect(()=>{
    console.log("Changing Pixels");
    setChange(true);
  },[pixels])

  return (
    <div className="Main">
      <div>
        <Menu viewing={isViewing} setViewing={setViewing}/>
        {/*<button onClick={()=>setViewing(false)}>Change</button>*/}
      </div>
      <div className="Canvas">
      {isViewing && <PixelsView color={color} refresh={refCount} pixels={pixels} setPixels={setPixels} socket={copySocket}/>}
      {!isViewing && <PixelsChange color={color} refresh={refCount} pixels={pixels} setPixels={setPixels} socket={copySocket}/>}
      </div>
      <div>
        {!isViewing && <ColorSelector setColor={setColor}/>}
        
      </div>
    </div>
  );
}

export default App;
