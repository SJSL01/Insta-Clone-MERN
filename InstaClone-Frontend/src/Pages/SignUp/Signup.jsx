import React, { useContext, useState } from 'react'
import AuthContext from '../../context/Auth'
import ToastContext from '../../context/Toast'
import { Link } from 'react-router-dom'

export default function Signup() {

  const { signup } = useContext(AuthContext)
  const {toast} = useContext(ToastContext)

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    password: ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  
  const handleSignup = (e) => {
    e.preventDefault()
    toast.success("SIGNUP")
    console.log(userData);
    signup(userData)

  }
  return (
    <div>
      <form>
        <div >
          <input type="email" onChange={handleInput} value={userData.email} name='email' placeholder='email' />

        </div>
        <div >
          <input type="text" onChange={handleInput} value={userData.name} name='name' placeholder='name' />
        </div>
        <div >
          <input type="text" onChange={handleInput} value={userData.username} name='username' placeholder='username' />
        </div>
        <div >
          <input type="password" onChange={handleInput} value={userData.password} name='password' placeholder='password' />
        </div>
        <div>
          <button type='submit' onClick={handleSignup}>Signup</button>
        </div>
        <div>
          <Link to={"/"}>Login</Link>
        </div>
      </form>
    </div>
  )
}
