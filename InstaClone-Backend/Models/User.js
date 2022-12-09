const mongoose = require("mongoose")



const UserSchema = new mongoose.Schema(
    {

        Fname:
        {
            type: String,
            required: true
        },
        Lname:
        {
            type: String,
            required: true
        },
        Email:
        {
            type: String,
            required: true,
            unique: true
        },
        Password:
        {
            type: String,
            required: true,

        },
        DateOfBirth:
        {
            type: String,
            required: true
        },
        Gender:
        {
            type: String,
            required: true
        },
        Avatar:
        {
            type: String,
            default: ""
        },
        Bio:
        {
            type: String,
            default: ""
        },
        Occupation:
        {
            type: String,
            default: ""
        },
        Followers:
        {
            type: Array,
            default: []
        },
        Following:
        {
            type: Array,
            default: []
        }

    }, { versionKey: false }
)

const User = mongoose.model("USERS", UserSchema)

module.exports = User;