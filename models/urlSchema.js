const mongoose = require("mongoose")

const URLSchema = new mongoose.Schema({
    urlCode: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model("URL", URLSchema)