const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const axios = require("axios");

// Create a post and trigger AI reply
router.post("/", async (req, res) => {
  try {
    const { author, content } = req.body;

    // 1. Save the user's post
    const newPost = new Post({ author, content });
    const savedPost = await newPost.save();

    // 2. Send content to AI (OpenRouter or another)
    const aiResponse = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "mistralai/mixtral-8x7b", // free model
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that answers questions on social media posts.",
        },
        {
          role: "user",
          content: content,
        },
      ],
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      }
    });

    const aiReply = aiResponse.data.choices[0].message.content;

    // 3. Save AI reply as a comment
    const aiComment = new Comment({
      postId: savedPost._id,
      content: aiReply,
      author: "AI Bot"
    });

    await aiComment.save();

    res.status(201).json({ post: savedPost, aiComment });
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ error: "Failed to create post" });
  }
});

module.exports = router;
