const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite'
});

const User = require('./User')(sequelize);
const Hotel = require('./Hotel')(sequelize);
const Room = require('./Room')(sequelize);
const Booking = require('./Booking')(sequelize);
const Review = require('./Review')(sequelize);

// Associations
User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.hasMany(Room);
Room.belongsTo(Hotel);

Room.hasMany(Booking);
Booking.belongsTo(Room);

// Many-to-Many Reviews
User.belongsToMany(Hotel, { through: Review });
Hotel.belongsToMany(User, { through: Review });

module.exports = { sequelize, User, Hotel, Room, Booking, Review };