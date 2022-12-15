
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/Auth'
import "../../Styles/Navbar.css"
export default function Navbar() {

    const { user, setUser } = useContext(AuthContext)
    const [menu, setMenu] = useState(false)

    const navigate = useNavigate()

    return (
        <div>
            <nav>
                <div className='nav-links'>
                    <Link to={"/home"}>Instagram</Link>
                    <Link to={"/home"}>Home</Link>
                    <button>Search</button>
                    <Link to={"/explore"}>Explore</Link>
                    <Link to={"/messages"}>Messages</Link>
                    <Link to={"/notifications"}>Notification</Link>
                    <Link to={"create"}>Create</Link>
                    <Link to={"/UserProfile"}>{user.name}</Link>
                </div>


                <div className='nav-buttons'>
                    <div style={menu ? { display: "flex", flexDirection: "column" } : { display: 'none', transition: "2s" }}>
                        <button value="Settings">Settings</button>
                        <button value="Settings">Saved</button>
                        <button value="Settings">Your Activity</button>
                        <button value="Settings">Report a Problem</button>
                        <button value="Settings">Switch Accounts</button>
                        <button onClick={() => {
                            setUser(null)
                            sessionStorage.clear()
                            navigate("/")
                        }} value="Logout">Logout</button>
                    </div>

                    <button onClick={() => { setMenu(!menu) }}>MENU</button>

                </div>

            </nav>
        </div>
    )
}
