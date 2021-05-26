import React from 'react'
import "./User.css";
function User({user, setUser}) {
    const logOut = ()=>{
        console.log("Loggin out user");
        setUser(null);
        localStorage.clear();
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
