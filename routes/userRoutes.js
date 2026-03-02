const router = require('express').Router();
const { User } = require('../models');

// แสดงผู้ใช้ทั้งหมด (Admin ใช้)
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.render('users/index', { users });
});

// แสดงรายละเอียด
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.render('users/show', { user });
});

module.exports = router;