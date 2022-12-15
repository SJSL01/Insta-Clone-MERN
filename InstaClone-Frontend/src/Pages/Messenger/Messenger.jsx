import axios from "axios"
import UserChats from "../../Components/UserChats/UserChats"
import TextMessages from "../../Components/TextMessages/TextMessages"
import AuthContext from "../../context/Auth"
import { useEffect, useState, useContext, useRef } from "react"
import { io } from "socket.io-client"
import '../../Styles/Messages.css'



export default function Messages() {


  const { user } = useContext(AuthContext)
  const [activeChat, setActiveChat] = useState(null)
  const [messages, setMesages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [receivedMessage, setreceivedMessage] = useState(null)
  const [allUserChats, setallUserChats] = useState([])
  const scrollRef = useRef()
  const socket = useRef()

  //! assigning the current user a socket ID
  useEffect(() => {
    socket.current = io("ws://localhost:3011")
    socket.current.on("getMessage", data => {
      setreceivedMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })
  }, [])


  //! display messages to valid users only

  useEffect(() => {
    console.log(receivedMessage);
    receivedMessage && activeChat?.members.includes(receivedMessage.sender) &&
      setMesages((prev) => [...prev, receivedMessage])
  }, [receivedMessage, activeChat])

  //! add curent user to the online array, and get the online array
  useEffect(() => {
    if (user === null) return
    socket.current?.emit("addUser", user?._id)
    socket.current?.on("getUsers", users => {
      console.log(users);
    })
  }, [user])

  //! get all the users with whom the current user has chats
  useEffect(() => {
    const getUserChats = async () => {
      try {
        const res = await axios.get(`http://localhost:3010/userchats/${user?._id}`)
        console.log(res.data)
        setallUserChats(res.data)
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserChats()
  }, [user])



  //! get the messages of active chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log(activeChat?._id);
        const res = await axios.get(`http://localhost:3010/message/${activeChat?._id}`)
        setMesages(res.data)
        console.log(messages);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [activeChat])

  //! chat scrolling effect
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
  }, [messages])



  //! sending a new message
  const SendMessage = async () => {
    const message = {
      sender: user._id,
      message: newMessage,
      conversations_Id: activeChat._id
    }

    const receiverId = activeChat.members.find(member => member !== user?._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      message: newMessage
    })


    try {
      const res = await axios.post("http://localhost:3010/message/", message)
      console.log(res.data);
      setMesages([...messages, res.data])
      setNewMessage("")
    } catch (error) {
      console.log(error);
    }
  }
  //! xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //!

  return (

    <div className='messages-container'>

      <div className="allChats">
        {allUserChats.map((chat) => {
          return (
            <div onClick={() => { setActiveChat(chat) }}>
              <UserChats chat={chat} user={user} />
            </div>
          )
        })}
      </div>


      <div>
        {
          activeChat ?
            <div className="active-chat">
              <div className="messages">
                {messages && messages.map((m) => {
                  return (
                    <div>
                      <TextMessages message={m} user={user} />
                    </div>
                  )
                })}
                <div ref={scrollRef}></div>
              </div>
              <div className="sendMessage">
                <input type="text" value={newMessage} onChange={(e) => { setNewMessage(e.target.value) }} />
                <button onClick={() => { SendMessage() }}>Send</button>
              </div>
            </div>
            :
            <div>
              <h1>Select a Conversation to Start to Chat</h1>
            </div>
        }
      </div>
    </div>

  )
}
