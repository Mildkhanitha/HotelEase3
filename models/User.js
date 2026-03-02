const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password_hash: DataTypes.STRING,
    contact_number: DataTypes.STRING,
    address: DataTypes.STRING,
    role: { type: DataTypes.STRING, defaultValue: 'customer' }
  });
};