const {app} = require('./index');
const PORT = 3004;





app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});