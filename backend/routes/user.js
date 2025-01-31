const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Fetch a user with their posts
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user and populate their posts
        const user = await User.findById(userId).populate('posts');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user with their posts
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
});

module.exports = router;