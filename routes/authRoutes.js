const router = require('express').Router();
const { User } = require('../models');

// หน้า login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// ตรวจสอบ login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, password_hash: password }
  });

  if (!user) {
    return res.send("Email หรือ Password ไม่ถูกต้อง");
  }

  req.session.user = user;

  if (user.role === 'admin') {
    return res.redirect('/dashboard');
  }

  res.redirect('/hotels');
});

// logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;