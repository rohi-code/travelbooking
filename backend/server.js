// server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your_secret_key_here';

app.use(cors());
app.use(bodyParser.json());

// ========== MONGOOSE CONNECTION ==========
mongoose.connect('mongodb+srv://taruntej947:qXwyBVdljaYy4Kmq@cluster0.hcdp4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
.catch(err => console.error("Mongo Error:", err));

const razorpay = new Razorpay({
    key_id: 'rzp_test_1HvMkP90RnAOqH',
    key_secret: 'O×5WWBZJIH3yE0FiHnZw3bPZ'
});
// ========== SCHEMAS ==========
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const bookingSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    type: { type: String, enum: ['movie', 'event', 'flight', 'bus', 'hotel'] },
    itemId: String, // MovieId, EventId, etc.
    date: String,
    seats: Number,
    status: { type: String, default: 'confirmed' }
});

const itemSchema = new mongoose.Schema({
    type: String, // movie, flight, event, etc.
    title: String,
    location: String,
    date: String,
    time: String,
    price: Number,
    availableSeats: Number,
    details: Object
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);
const Item = mongoose.model('Item', itemSchema);

// ========== MIDDLEWARE ==========
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// ========== AUTH ROUTES ==========
app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.json({ message: "User registered successfully" });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
    res.json({ token });
});

// ========== ITEM ROUTES ==========
app.post('/api/items', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const item = new Item(req.body);
    await item.save();
    res.json(item);
});

app.get('/api/items/:type', async (req, res) => {
    const { type } = req.params;
    const items = await Item.find({ type });
    res.json(items);
});

// ========== BOOKING ROUTES ==========
app.post('/api/book', authenticateToken, async (req, res) => {
    const { type, itemId, date, seats } = req.body;
    const booking = new Booking({
        userId: req.user.id,
        type,
        itemId,
        date,
        seats
    });
    await booking.save();
    res.json(booking);
});

app.get('/api/my-bookings', authenticateToken, async (req, res) => {
    const bookings = await Booking.find({ userId: req.user.id });
    res.json(bookings);
});

// ========== ADMIN ROUTES ==========
app.get('/api/all-bookings', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const bookings = await Booking.find();
    res.json(bookings);
});

// Initialize Razorpay instance

// ========== PAYMENT ROUTES ==========
// Route to create an order
app.post('/api/create-order', authenticateToken, async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        const options = {
            amount: amount * 100, // Amount in smallest currency unit (e.g., paise for INR)
            currency: currency || 'INR',
            receipt: receipt || 'receipt#1',
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Route to verify payment signature
app.post('/api/verify-payment', authenticateToken, (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', 'O×5WWBZJIH3yE0FiHnZw3bPZ') // Replace with your Razorpay Key Secret
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid signature' });
    }
});



// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});