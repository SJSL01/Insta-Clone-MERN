const mongoose = require("mongoose")



const UserSchema = new mongoose.Schema(
    {

        name:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true,

        },
        avatar:
        {
            type: String,
            default: ""
        },
        bio:
        {
            type: String,
            default: ""
        },
        occupation:
        {
            type: String,
            default: ""
        },
        followers:
        {
            type: Array,
            default: []
        },
        following:
        {
            type: Array,
            default: []
        }

    }, { versionKey: false }
)

const User = mongoose.model("USERS", UserSchema)

module.exports = User;