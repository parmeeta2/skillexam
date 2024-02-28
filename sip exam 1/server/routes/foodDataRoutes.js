const express = require("express");
const router = express.Router();
const FoodData = require('../models/foodData'); 

router.post('/get', async (req, res) => {
    try {
        const data = await FoodData.find({});

        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(404).json({ msg: 'No data found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
