const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
// const dbURI = 'mongodb+srv://Talif786:talifrgit@cluster0.eaonu.mongodb.net/DealsandCouponsUsers?';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
//   .then((result) => app.listen(4000))
//   .catch((err) => console.log(err));


// mongoose.connect('mongodb+srv://Talif786:talifrgit@cluster0.eaonu.mongodb.net/DealsandCouponsUsers?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

// var conn = mongoose.connection;

// conn.on('connected', function() {
//     console.log('Database is connected successfully.');
//     console.log("db object points to the database : "+ conn.name);
// });
// conn.on('disconnected',function(){
//     console.log('Database is disconnected successfully.');
// });

// conn.on('error', console.error.bind(console, 'connection error:'));




// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
app.listen(4000);