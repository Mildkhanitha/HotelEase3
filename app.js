require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const { sequelize } = require('./models');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'hotelsecret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use(require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/hotels', require('./routes/hotelRoutes'));
app.use('/rooms', require('./routes/roomRoutes'));
app.use('/bookings', require('./routes/bookingRoutes'));
app.use('/reports', require('./routes/reportRoutes'));

app.get('/', (req, res) => {
  res.render('home');
});

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});