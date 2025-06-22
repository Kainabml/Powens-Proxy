const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/get-token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://auth.sandbox.biapi.pro/2.0/oauth/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "TON_CLIENT_ID",
        client_secret: "TON_CLIENT_SECRET"
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Erreur serveur" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
