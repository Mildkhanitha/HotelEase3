const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Hotel', {
    hotel_name: DataTypes.STRING,
    location: DataTypes.STRING,
    address: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    contact_number: DataTypes.STRING,
    description: DataTypes.TEXT,
    image_url: DataTypes.STRING
  });
};