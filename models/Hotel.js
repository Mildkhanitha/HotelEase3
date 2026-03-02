module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Hotel', {
        hotelName: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING },
        rating: { type: DataTypes.INTEGER }
    });
};