const router = require('express').Router();
const { Hotel } = require('../models');

// middleware เช็ค admin แบบปลอดภัย
function isAdmin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/login');
  }

  if (req.session.user.role !== 'admin') {
    return res.redirect('/');
  }

  next();
}

router.get('/dashboard', isAdmin, async (req, res) => {
  const hotels = await Hotel.findAll();
  res.render('admin/dashboard', { hotels });
});

module.exports = router;