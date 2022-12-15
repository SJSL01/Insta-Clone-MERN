
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import '../../Styles/UserChats.css'

export default function UserChats({ chat, user }) {

  const [friend, setFriend] = useState("")

  useEffect(() => {

    const friendId = chat.members.find((m) => m !== user._id);
    console.log(friendId);

    const getFriend = async () => {
      try {
        const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
        const res = await axios.get(`http://localhost:3010/user/getUserInfo/${friendId}`, { headers })
        setFriend(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getFriend()

  }, [user, chat])

  return (
    <div className='chatHeadings'>
      <div className='friendAvatar'>
        <img src={friend?.avatar} alt="" />
      </div>
      <div className='friendUsername'>
        <h4>{friend?.username}</h4>
      </div>
    </div>
  )
}
