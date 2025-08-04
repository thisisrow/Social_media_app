// backend/app.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");  // ✅ Only keep this line

const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
