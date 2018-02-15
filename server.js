var express = require('express');
var port = process.env.PORT || 3000;
var app = module.exports = express();

var morgan      = require('morgan'),
    mongoose    = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config');

var annoncesRoutes = require('./api/routes/bonCoinRoute'); //importing route
var userRoutes = require('./api/routes/userRoute');
var authRoutes = require('./api/routes/authRoute');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});

app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var middlewareAuth = require('./api/middlewares/authenticateMiddleware');


app.use('/auth', authRoutes);
app.use('/users', [middlewareAuth, userRoutes]);
app.use('/annonces', [middlewareAuth, annoncesRoutes]);




app.listen(port);




console.log('Bon coin RESTful API server started on: ' + port);
