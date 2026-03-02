require('dotenv').config();
const expressLayouts = require('express-ejs-layouts');
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const { sequelize, User } = require('./models');

const app = express();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// --------------------
// Middleware
// --------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: 'hotel-secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

// ส่ง user ไปทุก view
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// --------------------
// Routes
// --------------------
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/adminRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/hotels', require('./routes/hotelRoutes'));
app.use('/rooms', require('./routes/roomRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/reports', require('./routes/reportRoutes'));

app.get('/', (req, res) => {
  res.render('home');
});

// --------------------
// Database Sync
// --------------------
sequelize.sync({ force: true }).then(async () => {

  await User.create({
    username: "admin",
    email: "admin@test.com",
    password_hash: "1234",
    role: "admin"
  });

  console.log("Database ready with admin");

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });

});