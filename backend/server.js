const express = require('express');
const app = express();
const { connectDB } = require('./configs/db');
const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Server!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
