const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/token', async (req, res) => {
  try {
    const { client_id, client_secret } = req.body;

    const url = 'https://auth.sandbox.biapi.pro/2.0/oauth/token';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', client_id);
    params.append('client_secret', client_secret);

    const response = await axios.post(url, params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de l’appel à Powens :', error.response?.data || error.message);
    res.status(500).json({ error: 'Erreur proxy Powens' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
