// server.js
const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  console.log(JSON.stringify({ event: 'root_accessed', status: 'success', time: new Date().toISOString() }));
  res.send('Welcome to the Product API');
});

app.get('/health', (req, res) => {
  console.log(JSON.stringify({ event: 'health_check', status: 'ok', message: 'App is healthy', time: new Date().toISOString() }));
  res.status(200).json({ status: 'ok', message: 'App is healthy - version 3' });
});

app.listen(PORT, () => {
  console.log(JSON.stringify({ event: 'server_start', port: PORT, time: new Date().toISOString() }));
});
