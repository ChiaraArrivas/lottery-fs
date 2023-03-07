const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
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
    stats: {
        type: Object,
        default: null,
    }
}, {timestamps: true, strict: true});

DrawSchema.plugin(mongoosePaginate);

const Draw = model("Draw", DrawSchema);
module.exports = Draw;