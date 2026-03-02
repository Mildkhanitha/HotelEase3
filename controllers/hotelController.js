const { Hotel } = require('../models');

exports.getAllHotels = async (req, res) => {
    const hotels = await Hotel.findAll();
    res.render('hotels/index', { hotels });
};

exports.createHotel = async (req, res) => {
    await Hotel.create(req.body);
    req.flash('success', 'เพิ่มโรงแรมเรียบร้อย!');
    res.redirect('/hotels');
};