const express = require('express');
const cors = require('cors');
const { sequelize, connectDB } = require('./configs/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('Furnza API is running...');
});

// Sync Database and Start Server
const startServer = async () => {
  await connectDB();
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();
