require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      success: true,
      serverTime: result.rows[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = 3000;

// Import auth routes
const authRoutes = require('./routes/authRoutes');
// Mount auth API
app.use('/api/auth', authRoutes);

// Login endpoint
// Login route moved to authRoutes

app.post('/debug', express.json(), (req, res) => { console.log('DEBUG BODY:', req.body); res.json({ received: req.body }); });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});