const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assurez-vous que le chemin d'accès au modèle User est correct
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('User already registered.');
    }

    user = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    await user.save();

    res.send({ email: user.email });
  } catch (error) {
    res.status(500).send('Error in Saving');
  }
};

exports.login = async (req, res) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('User not found.');
    }

    // Comparaison des mots de passe
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).send('Incorrect password.');
    }

    // Création du token JWT
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({ token });
  } catch (error) {
    res.status(500).send('Error in login');
  }
};
