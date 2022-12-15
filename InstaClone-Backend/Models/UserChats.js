const mongoose = require("mongoose")

const UserChatsSchema = mongoose.Schema({
    members: { type: Array }
}, { timestamps: true }
)

const UserChats = mongoose.model("UserChats", UserChatsSchema)

module.exports = UserChats;