import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { format } from "timeago.js"
import '../../Styles/TextMessages.css'
export default function Messages({ message, user }) {


  const [sender, setSender] = useState("")

  useEffect(() => {

    const senderId = message?.sender
    console.log(senderId);

    const getFriend = async () => {
      try {
        const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
        const res = await axios.get(`http://localhost:3010/user/getUserInfo/${senderId}`, { headers })
        setSender(res.data)
        // console.log(sender);
      } catch (error) {
        console.log(error);
      }
    }
    getFriend()

  }, [user, message])


  return (


    <div className='text-messages'>

      <small className={sender._id === user._id ? "user" : "friend"}>{sender?._id === user?._id ? "YOU" : sender.username}</small>

      <div className={sender._id === user._id ? "userMessage" : "friendMessage"}>{message.message}</div>

      <small className={sender._id === user._id ? "usertime" : "friendtime"} >{format(message.createdAt)}</small>

    </div >


  )
}
