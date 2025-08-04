const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

router.get("/instagram/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tokenRes = await axios.post("https://api.instagram.com/oauth/access_token", null, {
      params: {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code
      }
    });

    const { access_token, user_id } = tokenRes.data;

    const userRes = await axios.get(`https://graph.instagram.com/${user_id}?fields=id,username&access_token=${access_token}`);

    let user = await User.findOne({ instagramId: user_id });
    if (!user) {
      user = await User.create({
        instagramId: user_id,
        username: userRes.data.username,
        accessToken: access_token
      });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Instagram login error:", err.message);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;