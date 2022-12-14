const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv")
const connect_to_DB = require("./DB Config/DB Connect");



//! Config

dotenv.config()

const app = express()
app.use(cors())
app.use(morgan("common"))
app.use(express.json({ limit: "30mb" }))


//! Routes

app.use("/auth", require("./Routes/Auth.js"))
app.use("/user", require("./Routes/User.js"))
app.use("/posts", require("./Routes/Posts.js"))
app.use("/userchats", require("./Routes/UserChats.js"))
app.use("/message", require("./Routes/Message.js"))


const PORT = 3010 || process.env.PORT

app.listen(PORT, async () => {
    await connect_to_DB()
    console.log(`Server up at ${PORT}`);
})