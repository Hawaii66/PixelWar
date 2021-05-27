import React from 'react'
import "./User.css";
function User({user, setUser, socket, setViewing}) {
    const logOut = ()=>{
        console.log("Loggin out user");
        setUser(null);
        localStorage.clear();
        setViewing(true);
        socket.emit("LogOut",{message:"Log Out Client"});
    }

    return (
        <div className="User">
                <img src={user.imageUrl} alt="Profile" />
                <h3>{user.name}</h3>
                <button onClick={()=>logOut()}>Log Out</button>
            </div>
    )
}

export default User
