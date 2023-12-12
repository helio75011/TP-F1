const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');

router.post('/:user_id/timer', timerController.addTime);

module.exports = router;
