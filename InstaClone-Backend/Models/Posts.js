const mongoose = require("mongoose")



const PostSchema = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
    },

    username: String,

    avatar: String,

    postImage: String,

    description: String,

    likes: {
        type: Array,
        default: []
    },

    tags: String,

    comments: {
        type: Array,
        default: []
    },
    date: {
        type:String,
        default: new Date().toLocaleDateString()
    }
}, { timestamps: true })

const Post = mongoose.model("POST", PostSchema)

module.exports = Post;