const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv")
const body_parser = require("body-parser");
const connect_to_DB = require("./DB Config/DB Connect");



//! Config

dotenv.config()

const app = express()
app.use(cors())
app.use(morgan("common"))
app.use(body_parser.json({ limit: "20mb" }))
app.use(body_parser.urlencoded({ limit: "20mb", extended: true }))


//! Routes

app.use("/auth", require("./Routes/Auth.js"))
app.use("/user", require("./Routes/User.js"))


const PORT = 3010 || process.env.PORT

app.listen(PORT, async () => {
    await connect_to_DB()
    console.log(`Server up at ${PORT}`);
})