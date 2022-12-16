import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FeedCard from '../../Components/FeedCard/FeedCard';
import AuthContext from '../../context/Auth'

import "../../Styles/Home.css"

export default function Home() {

  const { user } = useContext(AuthContext)
  const [suggestions, setSuggestions] = useState(null)
  const [userFeed, setUserFeed] = useState([])

  // setInterval(() => {
  //   getFeed()
  // }, 100000)



  // const getSuggestions = async () => {
  //   try {
  //     const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
  //     const suggestionData = await axios.get("http://localhost:3010/user/suggestions", { headers })
  //     setSuggestions(suggestionData.data)
  //     // console.log(suggestions);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  const getFeed = async () => {
    try {
      const res = await axios.get(`http://localhost:3010/posts/${user?._id}`)
      setUserFeed(res.data)
    } catch (error) {
      console.log(error);
    }
  }


  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate("/")
    // getSuggestions()
    // console.log(user);
    getFeed()

  }, [])

  return (
    <div className='home-container'>

      <div>
        {userFeed.map((post) => {
          return (
            <FeedCard post={post} />
          )
        })}

      </div>

      {/* <div className="suggestions">
        <div>
          <img src={user?.avatar} alt="" />
          {user?.name}
        </div>
        <div>
          {user?.username}
        </div>
        <span>Sugestions For You</span>
        {
          suggestions && suggestions.map((suggestedUser)=>{
            return(
              <div>
                {suggestedUser.name}
              </div>
            )
          })
        }
        
      </div> */}

    </div>
  )
}
