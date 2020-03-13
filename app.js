var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
     extended: true
 }));

// set Running PORT
app.listen(3000, function () {
     console.log('Node app is running on port 3000');
});

// Router Invoking
var router = require('./routers/routes');
// Routes
app.use('/api', router);
 // default route
module.exports = app;