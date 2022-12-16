import React, { useContext, useState } from 'react'
import "../../Styles/Login.css"
import image from "../../assets/insta.png"
import AuthContext from '../../context/Auth'
import { Link } from 'react-router-dom'
export default function Login() {

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const [show, setShow] = useState(false)

  const handleInput = (e) => {
    const { name, value } = e.target

    setUserData({ ...userData, [name]: value })
  }



  const handleLogin = (e) => {
    e.preventDefault()
    console.log(userData);
    login(userData)
  }

  const { login } = useContext(AuthContext)



  return (
    <div className='main'>

      <div className='image-container'>
        <img src={image} alt="" />
        <img src={image} alt="" />
      </div>

      <div className='form-container'>
        <h1>Instagram</h1>
        <form >
          <div >
            <input type="email" onChange={handleInput} value={userData.email} name='email' placeholder='email' />

          </div>
          <div >
            <input type={show ? "text" : "password"} onChange={handleInput} value={userData.password} name='password' placeholder='password' />
            <div onMouseEnter={() => { setShow(true) }} onMouseLeave={() => { setShow(false) }}>Show</div>
          </div>

          <div>
            <button type='submit' onClick={handleLogin}>Login</button>
          </div>
          <div>
            <Link to={"/signup"}>signup</Link>
          </div>
        </form>
        <div className='loginwithfb'>
          <p>OR</p>
          <p>Log In With Facebook</p>
          <p>FOrget Password?</p>
        </div>
      </div>

    </div>
  )
}
