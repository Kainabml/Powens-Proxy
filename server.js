const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// ➕ Agent HTTPS qui désactive la vérification SSL
const agent = new https.Agent({ rejectUnauthorized: false });

app.post('/token', async (req, res) => {
  const { grant_type, client_id, client_secret } = req.body;

  try {
    const response = await axios.post(
      'https://auth.sandbox.biapi.pro/2.0/oauth/token',
      new URLSearchParams({
        grant_type,
        client_id,
        client_secret
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent: agent // <- Ignorer certificat SSL
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Erreur Powens :', error.response?.data || error.message);
    res.status(500).json({
      error: 'Erreur proxy Powens',
      detail: error.response?.data || error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
