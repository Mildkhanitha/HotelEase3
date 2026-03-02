module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Room', {
        roomType: { type: DataTypes.STRING, allowNull: false },
        pricePerNight: { type: DataTypes.INTEGER, allowNull: false },
        availability: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
};