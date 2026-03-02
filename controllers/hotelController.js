// controllers/hotelController.js
const hotelController = {
    // ฟังก์ชันแสดงหน้าตารางโรงแรม
    index: (req, res) => {
        // เดี๋ยวเราจะดึงข้อมูลจาก DB ตรงนี้ ตอนนี้ให้แสดงหน้าว่างๆ ไปก่อน
        res.render('hotels/index', { title: 'รายชื่อโรงแรม' });
    }
};

module.exports = hotelController;