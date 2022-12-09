const Post = require("../Models/Posts")
const User = require("../Models/User")



const createPost = async (req, res) => {

    try {

        const { description, postImage, tags, user } = req.body

        const newPost = await new Post({
            userId: user._id,
            Fname: user.Fname,
            Lname: user.Lname,
            Avatar: user.Avatar,
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
    const { User_Id } = req.body

    try {

        // const user = await User.findById(id)
        const post = await Post.findById(id)
        const isLiked = await post.likes.get(User_Id)

        if (isLiked) {
            post.likes.delete(User_Id)
        } else {
            post.likes.set(User_Id, true)
        }

        const UpdatedPost = await Post.findOneAndUpdate(id, { likes: post.likes })

        res.status(200).json(UpdatedPost)

    } catch (error) {
        res.status(409).json({ error: error.message })
    }

}

module.exports = { createPost, getFeed, getUserPosts, likePost }