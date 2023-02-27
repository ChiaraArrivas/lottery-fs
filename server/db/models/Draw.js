const mongoose = require("mongoose");
const { model, Schema} = mongoose;

const DrawSchema = new Schema({
    numbers: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "done"]
    },
    jackpot: {
        type: Number,
        default: 0
    },

}, {timestamps: true, strict: true});

const Draw = model("Draw", DrawSchema);
module.exports = Draw;