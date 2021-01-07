let createError = require('./node_modules/http-errors');
let express = require('./node_modules/express');
let path = require('path');
let cookieParser = require('./node_modules/cookie-parser');
let logger = require('./node_modules/morgan');
let cors = require("cors");
let mongoose = require('mongoose');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let booksRouter = require("./routes/books");
let config = require("./config");
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//******************************************************
//DB Connection
//******************************************************
try {
  mongoose.connect(config.db_connection);
  mongoose.connection.on('open', function (result) {
      console.log('DB Connection success');
  });
} catch (err) {
  console.log('DB Connection failed', err);
}

module.exports = app;
