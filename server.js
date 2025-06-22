const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("querystring");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.post("/token", async (req, res) => {
  try {
    const tokenResponse = await axios.post(
      "https://auth.sandbox.biapi.pro/2.0/oauth/token",
      qs.stringify({
        grant_type: "client_credentials",
        client_id: "39925270",
        client_secret: "fB5SmIq4NeroQ42Z63NvOqH6LPzUV9cT"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    console.error("Erreur proxy Powens :", error.response?.data || error.message);
    res.status(500).json({
      error: "Erreur proxy Powens",
      detail: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
