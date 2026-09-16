const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Import placeholder route for products to ensure frontend doesn't break
app.get('/api/products', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'Fresh Organic Apples',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6',
      description: 'Fresh and crispy organic apples directly from the farm.',
      brand: 'FarmFresh',
      category: 'Fruits & Vegetables',
      price: 150,
      countInStock: 50,
      rating: 4.5,
      numReviews: 12,
    },
  ]);
});

// Fallback JSON handler for missing API endpoints to prevent HTML <!DOCTYPE responses
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} not found` });
});

if (process.env.NODE_ENV !== 'production' || require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
