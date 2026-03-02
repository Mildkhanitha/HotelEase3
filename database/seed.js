const db = require('../models');

const seedDB = async () => {
    await db.sequelize.sync({ force: true }); // ล้างฐานข้อมูลเก่าและสร้างใหม่

    const hotel = await db.Hotel.create({ 
        hotelName: 'Grand Mind Resort', location: 'Prachinburi', rating: 5 
    });

    await db.Room.bulkCreate([
        { hotelId: hotel.id, roomType: 'Suite', pricePerNight: 2500, availability: true },
        { hotelId: hotel.id, roomType: 'Standard', pricePerNight: 1200, availability: true }
    ]);

    await db.User.create({ 
        username: 'admin', email: 'admin@hotelease.com', password: '123', role: 'admin' 
    });

    console.log("✅ ข้อมูลสมมติถูกเพิ่มเรียบร้อยแล้ว!");
    process.exit();
};

seedDB();