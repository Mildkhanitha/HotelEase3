require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const db = require('./models');
const app = express();

// 1. ตั้งค่า Template Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// 3. Session & Flash Messages (สำหรับแจ้งเตือนบันทึกสำเร็จ)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// ส่งตัวแปรไปให้ทุกหน้า EJS
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// 4. หน้าแรก (Home)
app.get('/', (req, res) => {
    res.render('home', { title: 'HotelEase3 - ระบบจองโรงแรม' });
});

// 5. รันเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(() => {
    console.log('✅ Database synced!');
});
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});