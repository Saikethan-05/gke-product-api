// middleware/auth.js
const dotenv = require('dotenv');
dotenv.config();


function apiKeyAuth(req, res, next) {
  const key = req.header('x-api-key');

  if (!key || key !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }

  next(); 
}

module.exports = apiKeyAuth;
