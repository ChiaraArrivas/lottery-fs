const mongoose = require("mongoose")
mongoose.set('strictQuery', true);

const connect = (cb)=> mongoose.connect(process.env.DB_URI,cb)

const models = {
    User: require("./models/User"),
};

module.exports = {
    connect, 
    ...models,
}