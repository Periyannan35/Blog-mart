const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name').sort({ createdAt: -1 });
  res.json(comments);
});

router.post('/', auth, async (req, res) => {
  const { text, postId } = req.body;
  if (!text || !postId) return res.status(400).json({ message: 'Text and postId required' });
  const comment = await Comment.create({ text, post: postId, user: req.userId });
  const populated = await comment.populate('user', 'name');
  res.status(201).json(populated);
});

router.delete('/:id', auth, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.user.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });
  await comment.remove();
  res.json({ message: 'Comment deleted' });
});

module.exports = router;
