const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // The text content of the comment
  avatar: { type: String, required: true }, // URL to the commenter's avatar
  createdAt: { type: Date, default: Date.now }, // Timestamp when the comment was created
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  likes: { type: Number, default: 0 }, // Number of likes (default: 0)
  dislikes: { type: Number, default: 0 }, // Number of dislikes (default: 0)
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true } // Reference to the Post model
});

module.exports = mongoose.model('Comment', commentSchema);