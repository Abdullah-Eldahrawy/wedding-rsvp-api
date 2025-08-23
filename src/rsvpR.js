const express = require('express');
const router = express.Router();
const Rsvp = require('./rsvpM');

router.post('/', async (req, res) => {
  const { name, phone, coming } = req.body;

  try {
    const rsvp = await Rsvp.findOneAndUpdate(
      { phone }, // match by phone
      { name, phone, coming }, // fields to update
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(rsvp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
