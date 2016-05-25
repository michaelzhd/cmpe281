var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var movie = require('./routes/movie');
var cart = require('./routes/cart');
var order = require('./routes/order');
var user = require('./routes/user');
var category = require('./routes/category');

var settings = require('./settings')

var app = express();


//connect to database
var mongoose = require('mongoose')
mongoose.connect('mongodb://' + settings.host + ':' + settings.port + '/' + settings.db)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//access allow settings
app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*'); // can access from anywhere, must be restricted to specific server in production
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});


//assign routers
app.use('/', routes);
app.use('/user', user);
app.use('/movie', movie);
app.use('/cart',cart);
app.use('/order',order);
app.use('/category',category);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
