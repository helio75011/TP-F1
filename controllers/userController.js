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

exports.updateUser = async (req, res) => {
  try {
    // Find the user by ID provided in the URL
    let user = await User.findById(req.params.user_id);
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Update user details
    if (req.body.email) user.email = req.body.email;
    if (req.body.role) user.role = req.body.role;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();

    res.send({ message: 'User updated successfully', user: { email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).send('Error in updating user');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Find the user by ID provided in the URL and delete
    const user = await User.findByIdAndDelete(req.params.user_id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    res.send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send('Error in deleting user');
  }
};