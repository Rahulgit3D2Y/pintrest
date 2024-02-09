const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postText: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", PostSchema);
