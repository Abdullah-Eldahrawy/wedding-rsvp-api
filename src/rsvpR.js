const express = require('express');
const router = express.Router();
const Rsvp = require('./rsvpM');

// Check if phone exists
router.get('/check-phone/:phone', async (req, res) => {
  try {
    const existing = await Rsvp.findOne({ phone: req.params.phone });
    if (existing) return res.sendStatus(200);
    return res.sendStatus(404);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, phone, coming } = req.body;
  try {
    const newRsvp = new Rsvp({ name, phone, coming });
    await newRsvp.save();
    res.status(201).json(newRsvp);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'Phone number already exists' });
    }
    res.status(400).json({ error: err.message });
  }
});

router.put('/:phonee', async (req, res) => {
  const { phonee } = req.params;
  const { name, coming } = req.body;

  try {
    const updatedRsvp = await Rsvp.findOneAndUpdate(
      { phone: phonee },
      { name, coming },
      { new: true }
    );

    if (!updatedRsvp) {
      return res.status(404).json({ message: 'RSVP not found' });
    }
    res.json(updatedRsvp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
