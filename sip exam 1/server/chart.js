// server.js

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/food_orders', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Order Schema and Model
const orderSchema = new mongoose.Schema({
  foodId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Route to handle new orders
app.post('/orders', async (req, res) => {
  try {
    const order = new Order({ foodId: req.body.foodId });
    await order.save();
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to calculate most ordered food for the day
async function calculateMostOrderedFood() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const orders = await Order.find({ createdAt: { $gte: today, $lt: tomorrow } });
    const foodCounts = {};

    orders.forEach(order => {
      const foodId = order.foodId.toString();
      foodCounts[foodId] = (foodCounts[foodId] || 0) + 1;
    });

    const mostOrderedFoodId = Object.keys(foodCounts).reduce((a, b) => foodCounts[a] > foodCounts[b] ? a : b);
    return mostOrderedFoodId;
  } catch (err) {
    console.error('Error calculating most ordered food:', err);
    return null;
  }
}

// Schedule cron job to calculate most ordered food daily at midnight
cron.schedule('0 0 * * *', async () => {
  const mostOrderedFoodId = await calculateMostOrderedFood();

  if (mostOrderedFoodId) {
    // Send information about most ordered food to users using a web-hook
    const webhookURL = 'your_webhook_url_here';
    const message = `The most ordered food today is food ID: ${mostOrderedFoodId}`;
    
    try {
      await axios.post(webhookURL, { message });
      console.log('Web-hook sent successfully');
    } catch (err) {
      console.error('Error sending web-hook:', err);
    }
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
