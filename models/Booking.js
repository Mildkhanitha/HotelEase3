const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Room', {
    room_type: DataTypes.STRING,
    price_per_night: DataTypes.FLOAT,
    max_occupancy: DataTypes.INTEGER,
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    room_image_url: DataTypes.STRING
  });
};