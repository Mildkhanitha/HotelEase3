const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Booking List');
});

module.exports = router;