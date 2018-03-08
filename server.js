var express = require('express');
var port = process.env.PORT || 3000;
var app = module.exports = express();

var mongoose    = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config');

var annoncesRoutes = require('./api/routes/annonceRoute'); //importing route
var userRoutes = require('./api/routes/userRoute');
var authRoutes = require('./api/routes/authRoute');
var avisRoutes = require('./api/routes/avisRoute');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});

app.set('superSecret', config.secret); // secret variable
app.set('secret_access_create_admin', config.secret_access_create_admin); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var middlewareAuth = require('./api/middlewares/authenticateMiddleware');


app.use('/auth', authRoutes);
app.use('/users', userRoutes); // TODO [middlewareAuth, userRoutes]
app.use('/annonces', annoncesRoutes);
app.use('/avis', avisRoutes);



app.listen(port);




console.log('Bon coin RESTful API server started on: ' + port);
