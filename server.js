const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');

const app = express();
const PORT = process.env.PORT || 10000;

// Autoriser les appels cross-origin
app.use(cors());

// Lire le body encodé en x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route POST /token
app.post('/token', async (req, res) => {
  try {
    const response = await axios.post(
      'https://auth.sandbox.biapi.pro/2.0/oauth/token',
      qs.stringify(req.body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Erreur Powens:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Erreur proxy Powens',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
