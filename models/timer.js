const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: Number, required: true }
});

const Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;
