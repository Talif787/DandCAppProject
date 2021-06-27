var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Talif786:talifrgit@cluster0.eaonu.mongodb.net/DealsandCouponsAdmin?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false} );
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('Database is connected successfully.');
    console.log("db object points to the database : "+ conn.name);    


});
conn.on('disconnected',function(){
    console.log('Database is disconnected successfully.');
});

conn.on('error', console.error.bind(console, 'connection error:'));


module.exports = conn;