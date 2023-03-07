const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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
    },
    prize: {
        type: Number,
        default: 0,
    }
}, {timestamps: true, strict: true});

BetSchema.plugin(mongoosePaginate);

const Bet = model("Bet", BetSchema);

module.exports = Bet;