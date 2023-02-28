const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const BetSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    numbers: {
        type: [Number],
        required: true,
    },
    selected_numbers: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "pending",    //"pending" |  "done"
        enum: ["pending", "done"]
    },
    won: {
        type: Boolean,
        default: false
    },
    draw: {
        type: Schema.Types.ObjectId,
        ref: "Draw",
        required: true,
    }
}, {timestamps: true, strict: true});

const Bet = model("Bet", BetSchema);

module.exports = Bet;