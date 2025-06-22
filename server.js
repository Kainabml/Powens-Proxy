const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/token', async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', req.body.client_id);
    params.append('client_secret', req.body.client_secret);

    const response = await axios.post(
      'https://auth.sandbox.biapi.pro/2.0/oauth/token',
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Erreur proxy Powens :', error.message);
    res.status(500).json({ error: 'Erreur proxy Powens' });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
