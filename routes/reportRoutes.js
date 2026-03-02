const router = require('express').Router();
const { Hotel, Room, Booking, User } = require('../models');

router.get('/hotel-bookings', async (req, res) => {
  const hotels = await Hotel.findAll({
    include: {
      model: Room,
      include: Booking
    }
  });
  res.render('reports/hotelReport', { hotels });
});

router.get('/member-activity', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Booking,
      include: { model: Room, include: Hotel }
    }
  });
  res.render('reports/memberReport', { users });
});

module.exports = router;