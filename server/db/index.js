const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const connect = (cb)=> mongoose.connect(process.env.DB_URI,cb)

const models = {
    User: require("./models/User"),
    Bet: require("./models/Bet"),
    Draw: require("./models/Draw"),
    Setting: require("./models/Setting"),
};


module.exports = {
    connect, 
    ...models,
}