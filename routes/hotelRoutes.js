const router = require('express').Router();
const { Op } = require('sequelize');
const { Hotel } = require('../models');

// index
router.get('/', async (req, res) => {
  const { location, minPrice, maxPrice } = req.query;

  let whereClause = {};

  // ค้นหาตามจังหวัด
  if (location) {
    whereClause.location = {
      [Op.like]: `%${location}%`
    };
  }

  // ค้นหาตามช่วงราคา
  if (minPrice && maxPrice) {
    whereClause.price_per_night = {
      [Op.between]: [minPrice, maxPrice]
    };
  } else if (minPrice) {
    whereClause.price_per_night = {
      [Op.gte]: minPrice
    };
  } else if (maxPrice) {
    whereClause.price_per_night = {
      [Op.lte]: maxPrice
    };
  }

  const hotels = await Hotel.findAll({
    where: whereClause
  });

  res.render('hotels/index', {
    hotels,
    requestQuery: req.query
  });
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