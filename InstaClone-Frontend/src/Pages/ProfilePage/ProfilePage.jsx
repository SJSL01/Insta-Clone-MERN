import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/Auth'
import "../../Styles/Profile.css"
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import FileBase64 from "react-file-base64"
import ToastContext from '../../context/Toast';
import axios from 'axios';


export default function ProfilePage() {

  const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setNewPost({
      user: "",
      description: "",
      tags: "",
      postImage: ""
    })
  };

  const handleShow = () => setShow(true);

  const { user } = useContext(AuthContext)
  const { toast } = useContext(ToastContext)
  const [Posts, setPosts] = useState([])
  const [editedProfile, setEditedProfile] = useState()


  const handlePost = async () => {
    setShow(false)

    try {
      const res = await axios.post("http://localhost:3010/posts/createPost", newPost, { headers })
      console.log(res.data);
      toast.success("posted")
      getUserPosts()
      setNewPost({
        ...newPost,
        description: "",
        tags: "",
        postImage: ""
      })
    } catch (error) {
      console.log(error);
    }

  }

  const [newPost, setNewPost] = useState({
    user: user,
    description: "",
    tags: "",
    postImage: ""
  })


  useEffect(() => {
    console.log(user);
    setNewPost({ ...newPost, user: user })
  }, [user])

  const getUserPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3010/posts/userPosts/${user?._id}`, { headers })
      setPosts(res.data.reverse())
      console.log(Posts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserPosts()
  }, [user])


  return (
    <div className='profile-container'>


      <div className='profile-head'>

        <div className='profile-img'>

          <img src={user?.avatar} alt="" />

        </div>

        <div className='head-information'>

          <div className='usernameSettings'>
            <h1 style={{ display: "inline-block" }}>{user?.username}</h1>
            <>
              <Button variant="dark" onClick={handleShow}>
                Edit Profile
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {newPost.postImage ?
                    <div className='previewImage'>
                      <img style={{ width: "100%", height: "300px" }} src={newPost?.postImage} alt="preview" />
                    </div> : <h3>Select a image to preview</h3>
                  }

                  <FileBase64 multiple={false} onDone={({ base64 }) => { setNewPost({ ...newPost, postImage: base64 }) }} />
                  <div>
                    <input type="text" value={newPost.description}
                      onChange={(e) => { setNewPost({ ...newPost, description: e.target.value }) }} placeholder='description' />
                    <input type="text" value={newPost.tags}
                      onChange={(e) => { setNewPost({ ...newPost, tags: e.target.value }) }} placeholder='tags' />
                  </div>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>
                    Discard
                  </Button>
                  <Button variant="success" onClick={handlePost}>
                    Post
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
            <span>❌</span>
          </div>

          <div className='userStats'>
            <span>{Posts?.length} Posts</span>
            <span>{user?.followers.length} Followers</span>
            <span>{user?.following.length} Following</span>
          </div>

          <div className='additional-info'>
            <span >{user?.name} ({user?.username})</span><br />
            <span>{user?.bio}</span>
          </div>

        </div>

      </div>


      <div className='createPost'>
        <>
          <Button variant="dark" onClick={handleShow}>
            +
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {newPost.postImage ?
                <div className='previewImage'>
                  <img style={{ width: "100%", height: "300px" }} src={newPost?.postImage} alt="preview" />
                </div> : <h3>Select a image to preview</h3>
              }

              <FileBase64 multiple={false} onDone={({ base64 }) => { setNewPost({ ...newPost, postImage: base64 }) }} />
              <div>
                <input type="text" value={newPost.description}
                  onChange={(e) => { setNewPost({ ...newPost, description: e.target.value }) }} placeholder='description' />
                <input type="text" value={newPost.tags}
                  onChange={(e) => { setNewPost({ ...newPost, tags: e.target.value }) }} placeholder='tags' />
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Discard
              </Button>
              <Button variant="success" onClick={handlePost}>
                Post
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>

      <hr />

      <div className="posts-container">
        <small>POSTS</small>
        <div className='posts'>
          {Posts.map((post) => {
            return (
              <div>
                <img src={post?.postImage} alt="post" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}


