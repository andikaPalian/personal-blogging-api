const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String]},
    author: {type: String, required: true},
    publishDate: {type: Date, default: Date.now},
}, {
    timestamps: true,
});

module.exports = mongoose.model("Article", articleSchema);