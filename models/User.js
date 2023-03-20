const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        message: {
            type: Array,
            required: true,
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model('User', UserSchema)