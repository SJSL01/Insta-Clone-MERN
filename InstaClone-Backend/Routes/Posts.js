const router = require("express").Router()

const { createPost, getFeed, getUserPosts, likePost } = require("../Controllers/Posts.js")

const JWT_AUTH = require("../Middlewares/JWT_AUTH")


router.post("/createPost", createPost)

router.get("/:id", getFeed)

router.get("/userPosts/:id", getUserPosts)

router.put("/like/:id", likePost)


module.exports = router;