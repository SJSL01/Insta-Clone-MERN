const mongoose = require("mongoose")

const connect_to_DB = () => {
    return mongoose.connect(process.env.DB_Cluster_URL).then(() => {
        console.log("Connected To The Database Successfully");
    }).catch((err) => {
        console.log(err.message);
    })
}

module.exports = connect_to_DB;