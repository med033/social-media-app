const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const router = express.Router();
const authMiddleware= require('../middleware/auth')

// Créer un post
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lister tous les posts avec leurs commentaires et likes
router.get('/',authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author')
            .populate('comments')
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter un like à un post
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const like = new Like({ post: post._id });
        await like.save();
        post.likes.push(like._id);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ajouter un commentaire à un post
router.post('/:id/comment', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({
            content: req.body.content,
            post: post._id,
            createdBy: req.user.id // Set the createdBy field using the authenticated user's ID
        });

        await comment.save();
        post.comments.push(comment._id);
        await post.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;