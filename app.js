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
var dashboardRouter = require('./routes/dashboard');
var moviesRouter = require('./routes/movies');
var signupHandler = require('./routes/signup');
var signinHandler = require('./routes/signin');
var signoutHandler = require('./routes/signout');
var deleteUserHandler = require("./routes/deleteuser");

app.get('/', function (req, res, next) {
    console.log("entered index");
    res.render('index');
    return;
});
app.use('/dashboard', dashboardRouter);
app.use('/movies', moviesRouter);
app.use('/signup', signupHandler);
app.use('/signin', signinHandler);
app.use('/signout', signoutHandler);
app.use("/deleteuser", deleteUserHandler);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    if (res.headersSent) {
        return;
    }
    createError(404);
    next();
});

function redirectGetRequestToPost(req, res, next) {
    res.render('gettoken');
    return;
}

module.exports = app;