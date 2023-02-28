const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const {model, Schema,} =  mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    is_active: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true, strict: true})

UserSchema.plugin(mongoosePaginate)
    
const User = model("User", UserSchema);

module.exports = User