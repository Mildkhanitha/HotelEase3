module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Booking', {
        checkInDate: { type: DataTypes.DATEONLY, allowNull: false },
        checkOutDate: { type: DataTypes.DATEONLY, allowNull: false },
        status: { type: DataTypes.STRING, defaultValue: 'confirmed' }
    });
};