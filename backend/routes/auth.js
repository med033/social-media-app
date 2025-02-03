const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Inscription
router.post('/signup', async (req, res) => {
  const { avatar,  username, email, password } = req.body;
  console.log(req);
  
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'Utilisateur existe déjà' });

    user = new User({ avatar, username, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Identifiants invalides' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Identifiants invalides' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;

      // Remove sensitive info like password before sending user data
      const { password, ...userWithoutPassword } = user.toObject();

      res.json({ token, user: userWithoutPassword });
    });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});


module.exports = router;