const router = require("express").Router()

const { createPost, getFeed, getUserPosts, likePost, commentPost } = require("../Controllers/Posts.js")


router.post("/createPost", createPost)

router.get("/:id", getFeed)

router.get("/userPosts/:id", getUserPosts)

router.put("/like/:id", likePost)

router.put("/comment/:id", commentPost)

module.exports = router;