var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var app = express();

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
var moviesclientRouter = require('./src/routes/moviesclient');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');
var signupHandler = require('./routes/signup');
var signinHandler = require('./routes/signin');
var signoutHandler = require('./routes/signout');

app.use('/', moviesclientRouter);
app.use('/singlemoviearticle', moviesclientRouter);
app.use('/ma', moviesclientRouter)
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/signup', signupHandler);
app.use('/signin', signinHandler);
app.use('/signout', signoutHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    if (res.headersSent) {
        return;
    }
    next(createError(404));
});


module.exports = app;