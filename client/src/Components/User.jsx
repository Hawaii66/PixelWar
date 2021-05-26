import React from 'react'
import "./User.css";
function User({user, setUser}) {
    console.log(user);
    console.log("---123")
    const logOut = ()=>{
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
