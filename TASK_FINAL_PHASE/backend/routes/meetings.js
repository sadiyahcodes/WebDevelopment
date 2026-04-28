const express = require('express');
const Meeting = require('../models/Meeting');
const auth = require('../middleware/auth');

const router = express.Router();

// Schedule meeting
router.post('/schedule', auth, async (req, res) => {
  const { title, participants, scheduledAt, duration } = req.body;
  // Check for conflicts
  const conflicts = await Meeting.find({
    participants: { $in: participants },
    $or: [
      { scheduledAt: { $lte: new Date(scheduledAt), $gte: new Date(new Date(scheduledAt).getTime() - duration * 60000) } },
      { scheduledAt: { $gte: new Date(scheduledAt), $lte: new Date(new Date(scheduledAt).getTime() + duration * 60000) } }
    ]
  });
  if (conflicts.length > 0) {
    return res.status(400).json({ error: 'Conflict detected' });
  }
  const meeting = new Meeting({ title, participants, scheduledAt, duration, createdBy: req.user.id });
  await meeting.save();
  res.json(meeting);
});

// Get meetings
router.get('/', auth, async (req, res) => {
  const meetings = await Meeting.find({ participants: req.user.id }).populate('participants', 'name');
  res.json(meetings);
});

// Accept/Reject meeting
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body; // 'accepted' or 'rejected'
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting.participants.includes(req.user.id)) return res.status(403).json({ error: 'Not a participant' });
  meeting.status = status;
  await meeting.save();
  res.json(meeting);
});

module.exports = router;