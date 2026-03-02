const router = require('express').Router();
const { Hotel } = require('../models');

// index
router.get('/', async (req, res) => {
  const hotels = await Hotel.findAll();
  res.render('hotels/index', { hotels });
});

// create form
router.get('/new', (req, res) => {
  res.render('hotels/create');
});

// create
router.post('/', async (req, res) => {
  await Hotel.create(req.body);
  res.redirect('/hotels');
});

// show
router.get('/:id', async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  res.render('hotels/show', { hotel });
});

// edit
router.get('/:id/edit', async (req, res) => {
  const hotel = await Hotel.findByPk(req.params.id);
  res.render('hotels/edit', { hotel });
});

// update
router.put('/:id', async (req, res) => {
  await Hotel.update(req.body, { where: { id: req.params.id } });
  res.redirect('/hotels');
});

// delete
router.delete('/:id', async (req, res) => {
  await Hotel.destroy({ where: { id: req.params.id } });
  res.redirect('/hotels');
});

module.exports = router;