const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Like', LikeSchema);