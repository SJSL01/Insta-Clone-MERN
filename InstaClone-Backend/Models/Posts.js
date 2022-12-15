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
        type: Map,
        of: Boolean,
        default:{}
    },

    tags: String,

    comments: {
        type: Array,
        default: []
    }
})

const Post = mongoose.model("POST", PostSchema)

module.exports = Post;