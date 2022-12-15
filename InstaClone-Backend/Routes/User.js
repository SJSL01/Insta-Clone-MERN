const router = require("express").Router()

const { getUserInfo, getUserFollowers, getUserFollowing,
    addRemoveFollowing, addRemoveFollowers, getSuggestions } = require("../Controllers/User.js")

const JWT_AUTH = require("../Middlewares/JWT_AUTH")

//? get user info
router.get("/getUserInfo/:id", JWT_AUTH, getUserInfo)

//? get user followers
router.get("/:id/followers", JWT_AUTH, getUserFollowers)

//? get user following
router.get("/:id/following", JWT_AUTH, getUserFollowing)

//? addRemove Following
router.put("/:id/:/:followingId", JWT_AUTH, addRemoveFollowing)

//? addRemove Followers
router.put("/:id/:followerId", JWT_AUTH, addRemoveFollowers)

router.get("/suggestions", JWT_AUTH, getSuggestions)

module.exports = router;