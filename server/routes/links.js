const express = require('express');
const router = express.Router();
const Link = require('../models/Link');

// Get all links
router.get('/', async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a link
router.post('/', async (req, res) => {
  const link = new Link({
    name: req.body.name,
    url: req.body.url,
    description: req.body.description
  });

  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
