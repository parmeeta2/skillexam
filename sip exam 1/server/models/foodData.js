const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    CategoryName: String,
    name: String,
    img: String,
    options: [{
        type: mongoose.Schema.Types.Mixed 
    }],
    description: String,
});

const FoodData = mongoose.model("food", foodSchema, "food"); 

module.exports = FoodData;
