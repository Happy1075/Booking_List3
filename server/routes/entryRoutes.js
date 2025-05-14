import express from 'express';
import { adminCheck, authCheck } from '../middleware/authMiddleware.js';
import Entry from '../models/Entry.js';

const router = express.Router();

// Create
router.post('/', authCheck, adminCheck, async (req, res) => {
  try {
    const entry = new Entry({ ...req.body, createdBy: req.user.id });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all
router.get('/', authCheck, async (req, res) => {
  try {
    const entries = await Entry.find().populate('createdBy', 'email role');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update
router.put('/:id', authCheck, adminCheck, async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete
router.delete('/:id', authCheck, adminCheck, async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
