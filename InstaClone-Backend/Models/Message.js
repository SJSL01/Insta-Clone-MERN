const mongoose = require("mongoose")



const MessageSchema = mongoose.Schema(
    { conversations_Id: String, sender: String, message: String }, { timestamps: true }
)

const Message = mongoose.model("Messages", MessageSchema)

module.exports = Message;