const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Review', {
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    review_date: DataTypes.DATE
  });
};