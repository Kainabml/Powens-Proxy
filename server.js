// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const POWENS_AUTH_URL = 'https://lynxia-sandbox.biapi.pro/2.0/auth/token';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing CLIENT_ID or CLIENT_SECRET environment variables');
  process.exit(1);
}

app.post('/token', async (req, res) => {
  try {
    const response = await axios.post(
      POWENS_AUTH_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }),
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }
    );

    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Powens erreur :', error.toJSON ? error.toJSON() : error.message);
    res.status(500).json({ error: 'Erreur proxy Powens', detail: error.toJSON ? error.toJSON() : error.message });
  }
});

// Démarrer le serveur
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
