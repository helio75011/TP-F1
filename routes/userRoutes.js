const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controllers/userController');

// Non-protected routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.put('/:user_id', auth, userController.updateUser);
router.delete('/:user_id', auth, userController.deleteUser);

// Protected admin route
router.delete('/admin/user/:user_id', [auth, admin], userController.deleteUser);

module.exports = router;
