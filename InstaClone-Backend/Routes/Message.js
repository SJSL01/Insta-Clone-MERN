const router = require("express").Router()
const Message = require("../Models/Message")


router.post("/", async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/:conversationId", async (req, res) => {
    try {
        console.log("getmessage");
        const messages = await Message.find({ conversations_Id: req.params.conversationId })
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
})





module.exports = router;