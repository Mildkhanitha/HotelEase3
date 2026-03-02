const { Sequelize } = require('sequelize');
const path = require('path');

// ตั้งค่า SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite'),
    logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// นำเข้า Models (เดี๋ยวเราจะสร้างไฟล์เหล่านี้ในสเต็ปถัดไป)
db.User = require('./User')(sequelize, Sequelize);
db.Hotel = require('./Hotel')(sequelize, Sequelize);
db.Room = require('./Room')(sequelize, Sequelize);
db.Booking = require('./Booking')(sequelize, Sequelize);

// ⭐ กำหนดความสัมพันธ์ (Associations) ตามโจทย์อาจารย์
// 1. One-to-Many: โรงแรมหนึ่งแห่งมีหลายห้อง
db.Hotel.hasMany(db.Room, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
db.Room.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// 2. Many-to-Many: ลูกค้าจองได้หลายห้อง และห้องหนึ่งถูกจองได้หลายครั้ง (ผ่าน Bookings)
db.User.hasMany(db.Booking, { foreignKey: 'userId' });
db.Booking.belongsTo(db.User, { foreignKey: 'userId' });

db.Room.hasMany(db.Booking, { foreignKey: 'roomId' });
db.Booking.belongsTo(db.Room, { foreignKey: 'roomId' });

module.exports = db;