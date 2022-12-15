const io = require("socket.io")(3011, {
    cors: {
        origin: "http://localhost:3000"
    }
})


let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};


const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}


const getUser = (receiverId) => {
    return users.find(user => user.userId === receiverId)
}

io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    })

    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const receiver = getUser(receiverId)
        io.to(receiver.socketId,).emit("getMessage", {
            senderId,
            message
        })
    })

    socket.on("disconnect", () => {
        console.log("a user disconected");
        removeUser(socket.id)
        io.emit("getUsers", users);
    })
})