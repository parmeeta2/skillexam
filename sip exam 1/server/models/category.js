const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    "CategoryName":String,
})
const category = mongoose.model("category", categorySchema, "category");

module.exports = category;