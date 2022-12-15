const User = require("../Models/User")
const { body, validationResult } = require("express-validator")


const getUserInfo = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id)

        user.password = undefined;

        res.status(200).json(user)

    } catch (error) {

        res.status(404).json({ error: error.message })

    }

}

const getSuggestions = async (req, res) => {

    try {

        const { id } = req.body;

        const suggestions = await User.find({ followers: { $nin: [id] } })
        console.log("suggestions" + suggestions);

        res.status(200).json(suggestions)

    } catch (error) {

        res.status(404).json({ error: error.message })

    }

}


const getUserFollowers = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id)

        const followers = await Promise.all(
            user.Followers.map((id) => {
                User.findById(id)
            })
        );

        const formattedFollowers = followers.map(
            ({ _id, Fname, Lname, Avatar, Occupation }) => {
                return { _id, Fname, Lname, Avatar, Occupation }
            })

        res.status(200).json(formattedFollowers)

    } catch (error) {

        res.status(404).json({ error: error.message })
    }

}
const getUserFollowing = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findById(id)

        const following = await Promise.all(
            user.Following.map((id) => {
                User.findById(id)
            })
        )

        const formattedFollowing = following.map(
            ({ _id, Fname, Lname, Avatar, Occupation }) => {
                return { _id, Fname, Lname, Avatar, Occupation }
            }
        )

        res.status(200).json(formattedFollowing)

    } catch (error) {

        res.status(404).json({ error: error.message })
    }
}
const addRemoveFollowing = async (req, res) => {

    try {

        const { id, followingId } = req.params;

        const user = await User.findById(id)

        const user2 = await User.findById(followingId)

        if (user.Following.includes(followingId)) {
            user.Following = user.Following.filter((id) => id !== followingId)
            user2.Followers = user2.Followers.filter((id) => id !== id)
        } else {
            user.Following.push(followingId)
            user2.Followers.push(id)
        }

        await user.save()
        await user2.save()

        const following = await Promise.all(
            user.Following.map((id) => {
                User.findById(id)
            })
        )

        const formattedFollowing = following.map(
            ({ _id, Fname, Lname, Avatar, Occupation }) => {
                return { _id, Fname, Lname, Avatar, Occupation }
            }
        )

        res.status(200).json(formattedFollowing)



    } catch (error) {

        res.status(404).json({ error: error.message })
    }
}



const addRemoveFollowers = async (req, res) => {
    try {

        const { id, followingId } = req.params;

        const user = await User.findById(id)

        const user2 = await User.findById(followingId)

        if (user.Followers.includes(followingId)) {
            user.Followers = user.Followers.filter((id) => id !== followingId)
            user2.Following = user2.Following.filter((id) => id !== id)
        } else {
            user.Followers.push(followingId)
            user2.Following.push(id)
        }

        await user.save()
        await user2.save()

        const followers = await Promise.all(
            user.Followers.map((id) => {
                User.findById(id)
            })
        );

        const formattedFollowers = followers.map(
            ({ _id, Fname, Lname, Avatar, Occupation }) => {
                return { _id, Fname, Lname, Avatar, Occupation }
            })

        res.status(200).json(formattedFollowers)

    } catch (error) {

        res.status(404).json({ error: error.message })
    }
}



module.exports = { getUserInfo, getUserFollowers, getUserFollowing, addRemoveFollowers, addRemoveFollowing, getSuggestions }