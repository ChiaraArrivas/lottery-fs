const mongoose = require("mongoose");
const {model, Schema} = mongoose;

const SettingSchema = new Schema({
    key: {
        type: String,
        default: "DRAWS_SETTINGS"
    },
    steps: {
        type: [Object],
        required: true
    }
}, {timestamps: true, strict: true})

const Setting = model("Setting", SettingSchema);
module.exports = Setting;