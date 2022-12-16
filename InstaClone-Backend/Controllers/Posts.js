const Post = require("../Models/Posts")
const User = require("../Models/User")



const createPost = async (req, res) => {

    try {

        const { description, postImage, tags, user } = req.body

        const newPost = await new Post({
            userId: user._id,
            username: user.username,
            avatar: user.avatar,
            description,
            postImage,
            tags
        })

        const post = await newPost.save()

        res.status(201).json(post)

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}


const getFeed = async (req, res) => {

    const { id } = req.params

    try {

        // const user = await User.findById(id)
        const UserFeed = await Post.find({ userId: { $ne: id } })
        res.status(200).json(UserFeed)

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}


const getUserPosts = async (req, res) => {

    const { id } = req.params


    try {

        // const user = await User.findById(id)
        // console.log(user);
        const UserPosts = await Post.find({ userId: { $eq: id } })
        res.status(200).json(UserPosts)

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}


const likePost = async (req, res) => {

    const { id } = req.params
    const User_Id = req.body._id

    try {
        const post = await Post.findById(id)
        const isLiked = await post.likes.indexOf(User_Id)

        if (isLiked !== -1) {
            post.likes.splice(isLiked, 1)
        } else {
            post.likes.push(User_Id)
        }

        await post.save()

        res.send("like")

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}
const commentPost = async (req, res) => {

    const { id } = req.params
    const { comment } = req.body
    const { username } = req.body.user
    console.log(comment, username);

    try {
        const post = await Post.findById(id)

        post.comments.push({ username, comment })

        await post.save()
        
        res.send("comment")

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

module.exports = { createPost, getFeed, getUserPosts, likePost, commentPost }