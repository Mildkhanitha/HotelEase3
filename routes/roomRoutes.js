const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Room List');
});

module.exports = router;