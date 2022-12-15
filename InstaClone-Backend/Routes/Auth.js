const router = require("express").Router()

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Models/User")
const { body, validationResult } = require("express-validator")
const JWT_AUTH = require("../Middlewares/JWT_AUTH")

router.post("/isLoggedIn", JWT_AUTH, async (req, res) => {
    try {
        const user = await User.find({ _id: res.user.id })
        console.log(user);
        return res.status(200).json({ user: user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body

        console.log(req.body);

        const getUser = await User.find({ email: email })

        console.log(getUser);

        if (getUser === null) return res.status(400).json({ error: `No User with ${email} Found.` })

        const doesPasswordMatches = await bcrypt.compare(password, getUser[0].password)

        if (!doesPasswordMatches) return res.status(400).json({ error: `Invalid Credentials` })

        const token = jwt.sign({ id: getUser[0]._id }, process.env.JWT_SECRET)

        getUser[0].password = null

        res.status(200).json({ getUser, token })


    } catch (error) {

        res.status(500).json({ error: error.message })
    }

})

router.post("/signup",

    body("email").isEmail().withMessage(`Not a valid Email.`),
    body("name").isAlphanumeric().withMessage(`Name Cannot Contain Special Characters`)
        .isLength({ min: 2, max: 15 }).withMessage(" Fname should be between 2 to 15 characters."),
    body("username").isAlphanumeric().withMessage(`username Cannot Contain Special Characters`)
        .isLength({ min: 2, max: 15 }).withMessage(" username should be between 2 to 15 characters."),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        try {
            const {
                name,
                username,
                email,
                password,
                avatar
            } = req.body

            console.log(req.body);

            const alreadyRegistered = await User.find({ email: email })

            console.log(alreadyRegistered);

            if (alreadyRegistered.length !== 0) return res.status(400).json({ error: `User with ${email} already exists.` })

            const encryptedPassword = await bcrypt.hash(password, 15)

            const newUser = new User({
                name,
                username,
                email,
                password: encryptedPassword,
                avatar
            })

            const registeredUser = await newUser.save()
            res.status(201).json(registeredUser)

        } catch (error) {

            res.status(500).json({ error: error.message })

        }
    })


router.get("/test", async (req, res) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router