const Timer = require('../models/timer');

exports.addTime = async (req, res) => {
  try {
    const timer = new Timer({
      user_id: req.params.user_id,
      time: req.body.time
    });

    await timer.save();
    res.send(timer);
  } catch (error) {
    res.status(500).send('Error in saving time');
  }
};
