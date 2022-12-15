const router = require("express").Router()
const UserChats = require("../Models/UserChats")


router.post("/", async (req, res) => {
    try {
        const { receiverId, senderId } = req.body
        const newChat = new UserChats({
            members: [receiverId, senderId]
        })

        const savedChat = await newChat.save()
        res.status(200).json(savedChat)

    } catch (error) {
        res.status(500).json(error.message)
    }
})


router.get("/:userId", async (req, res) => {
    try {
        console.log(req.params);
        const chats = await UserChats.find({ members: { $in: [req.params.userId] } })
        console.log(chats);
        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router;