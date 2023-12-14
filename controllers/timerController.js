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

exports.postTimer = async (req, res) => {
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

exports.getUserTimers = async (req, res) => {
  try {
      const userTimers = await Timer.find({ user_id: req.params.user_id });
      res.json(userTimers);
  } catch (error) {
      res.status(500).send('Error in fetching timers');
  }
};

exports.getAverageTime = async (req, res) => {
  try {
      const timers = await Timer.find({ user_id: req.params.user_id });
      const total = timers.reduce((acc, cur) => acc + cur.time, 0);
      const averageTime = timers.length > 0 ? total / timers.length : 0;
      res.json({ averageTime: averageTime });
  } catch (error) {
      res.status(500).send('Error in calculating average time');
  }
};