import React, {useState,useEffect} from "react"
import socketIOClient from "socket.io-client";
import GoogleLogin from "react-google-login";

import PixelsView from "./Components/Image/View/Pixels.jsx"
import PixelsChange from "./Components/Image/Change/Pixels.jsx";
import ColorSelector from "./Components/ColorDisplay.jsx/ColorSelector.jsx";
import Menu from "./Components/Menu/Menu.jsx";

import "./App.css"

const {REACT_APP_GOOGLE_CI} = process.env;

function App() {
  const [color, setColor] = useState("Black");
  const [refCount, setRefCount] = useState(0);
  const [pixels, setPixels] = useState([[null,null,null],[null,null,null]]);
  const [copySocket, setSocket] = useState(undefined);
  const [canChangePixels, setChange] = useState(true);
  const [isViewing, setViewing] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

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

  const googleSuccess = (res)=>{
    console.log(res);
    setUser(res.profileObj)
    localStorage.setItem("user", JSON.stringify(res.profileObj));
  }
  const googleFailure = (error)=>{
    console.log(error);
  }

  return (
    <div className="Main">
      {user === null ? 
      <div>
        <GoogleLogin
          clientId={REACT_APP_GOOGLE_CI}
          buttonText="Login"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
        />
      </div> 
      :
      <div>
        <Menu viewing={isViewing} setViewing={setViewing} user={user} setUser={setUser}/>
        {/*<button onClick={()=>setViewing(false)}>Change</button>*/}
      </div>}
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
