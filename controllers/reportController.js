const { Booking, User, Room, Hotel } = require('../models');

exports.getBookingReport = async (req, res) => {
    // ใช้ Include เพื่อทำ Joins 3 ตาราง
    const reportData = await db.Booking.findAll({
        include: [
            { model: User, attributes: ['username'] },
            { model: db.Room, include: [db.Hotel] }
        ]
    });
    res.render('reports/report1', { reportData });
};