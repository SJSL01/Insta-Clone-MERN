const router = require("express").Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Models/User")
const { body, validationResult } = require("express-validator")


//? SignUP 

router.post("/signup",

    body("Email").isEmail().withMessage(`Not a valid Email.`),
    body("Fname").isAlphanumeric().withMessage(`Fname Cannot Cantain Special Characters`)
        .isLength({ min: 2, max: 15 }).withMessage(" Fname should be between 2 to 15 characters."),
    body("Lname").isAlphanumeric().withMessage(`Fname Cannot Cantain Special Characters`)
        .isLength({ min: 2, max: 15 }).withMessage(" Fname should be between 2 to 15 characters."),
    body("Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
        .withMessage("Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character."),

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            const {
                Fname,
                Lname,
                Email,
                DateOfBirth,
                Password,
                Gender,
                Avatar,
                Bio,
                Occupation
            } = req.body

            const alreadyRegistered = await User.findOne({ Email: Email })

            if(alreadyRegistered) return res.status(400).json({error: `User with ${Email} already exists.`})

            const encryptedPassword = await bcrypt.hash(Password, 15)

            const newUser = new User({
                Fname,
                Lname,
                Email,
                DateOfBirth,
                Password: encryptedPassword,
                Gender,
                Avatar,
                Bio,
                Occupation
            })

            const registeredUser = await newUser.save()
            res.status(201).json(registeredUser)

        } catch (error) {

            res.status(500).json({ error: error.message })

        }
    })


module.exports = router;


//? Logging in

router.post("/login")