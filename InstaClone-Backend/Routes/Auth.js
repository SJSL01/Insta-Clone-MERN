const router = require("express").Router()

const { login, signup } = require("../Controllers/Auth")
console.log(login);

router.post("/login", login)
router.post("/signup", signup)

module.exports = router