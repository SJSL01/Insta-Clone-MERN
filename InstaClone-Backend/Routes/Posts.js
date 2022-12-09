const router = require("express").Router()

const { createPost, getFeed, getUserPosts, likePost } = require("../Controllers/Posts.js")

const JWT_AUTH = require("../Middlewares/JWT_AUTH")


router.post("/createPost", JWT_AUTH, createPost)

router.get("/:id", JWT_AUTH, getFeed)

router.get("/userPosts/:id", JWT_AUTH, getUserPosts)

router.put("/like/:id", JWT_AUTH, likePost)


module.exports = router;