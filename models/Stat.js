const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatSchema = new Schema({
    resume_downloaded: {
        type: Boolean,
        required: true,
    },
    
},
{timestamps: true}
)

module.exports = mongoose.model('Stat', StatSchema)