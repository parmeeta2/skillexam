const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/order_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Order Schema and Model
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  orderId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: String,
  deliveryAddress: String,
  paymentMode: String
});

const Order = mongoose.model('Order', orderSchema);

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // other user properties
});

const User = mongoose.model('User', userSchema);

// Route to display orders based on user
app.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('foodId');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to send OTP email for order delivery confirmation
app.post('/orders/:orderId/send-otp', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('userId');
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP

    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
      }
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: order.userId.email,
      subject: 'Order Delivery Confirmation OTP',
      text: `Your OTP for confirming order delivery: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Error sending OTP' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ message: 'OTP sent successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
