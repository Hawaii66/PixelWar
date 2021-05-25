import React, {useState,useEffect} from "react"
import socketIOClient from "socket.io-client";

import PixelsView from "./Components/Image/View/Pixels.jsx"
import PixelsChange from "./Components/Image/Change/Pixels.jsx";
import ColorSelector from "./Components/Image/Change/Menu/ColorSelector.jsx";
import Menu from "./Components/Menu/Menu.jsx";

function App() {
  const [color, setColor] = useState("Black");
  const [refreshRate, setRate] = useState(250);
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
    <div>
      <Menu/>
      {isViewing && <PixelsView color={color} refresh={refCount} pixels={pixels} setPixels={setPixels} socket={copySocket}/>}
      {!isViewing && <PixelsChange color={color} refresh={refCount} pixels={pixels} setPixels={setPixels} socket={copySocket}/>}
      <ColorSelector setColor={setColor} setRefresh={setRate}/>
      <button onClick={()=>setViewing(false)}>Change</button>
    </div>
  );
}

export default App;
