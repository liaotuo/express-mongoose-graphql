// 导入相关依赖包
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 导入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置 Mongoose 连接
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 设置express常用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// 错误处理器
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // 设置 locals，只在开发环境提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // 渲染出错页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
