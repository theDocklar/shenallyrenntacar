const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', project: 'Shenaly Rent a Car Operations API', timestamp: new Date() });
});

// Placeholder for API routers
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/vehicles', require('./routes/vehicleRoutes'));
// app.use('/api/renters', require('./routes/renterRoutes'));
// app.use('/api/rentals', require('./routes/rentalRoutes'));
// app.use('/api/costs', require('./routes/costRoutes'));
// app.use('/api/payments', require('./routes/paymentRoutes'));
// app.use('/api/whatsapp', require('./routes/whatsappRoutes'));

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
