import express from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.CLIENT_URL}/login` 
  }),
  (req, res) => res.redirect(process.env.CLIENT_URL)
);

router.get('/check', (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ error: 'Unauthorized' });
});

router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
});

router.post('/set-role', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role: req.body.role },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
