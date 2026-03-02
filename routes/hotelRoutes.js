// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// เมื่อเข้า URL: /hotels ให้ไปเรียกฟังก์ชัน index ใน Controller
router.get('/', hotelController.index);

module.exports = router;