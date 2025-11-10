
// server.js
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
require("./db")

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

app.get('/health', (_, res) => {
  res.json({ status: 'ok', message: 'App is healthy - Version 2' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

