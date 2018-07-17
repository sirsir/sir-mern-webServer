var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var calResponseTime = require('./routes/calResponseTime');
var reactTest = require('./routes/reactTest');
var jsRunner = require('./routes/jsRunner');
var jsRunnerApi = require('./routes/jsRunnerApi');
var memos = require('./routes/memos');
var memosApi = require('./routes/memosApi');
var sirFileFolderApi = require('./routes/sirFileFolderApi');


//=== Set mongoose
var mongoose = require('mongoose') , 
Admin = mongoose.mongo.Admin;

var ip = require("ip").address();
var mongoDB = 'mongodb://' + ip + ':27017/sir';

//=== set router shared variable
var serverStatus = {
  source: __dirname,
  mongoDb_connected: false,
  mongoDb_server: mongoDB
}

// var connection = mongoose.connect(mongoDB, { useMongoClient: true, options: { promiseLibrary: mongoose.Promise } })
// var connection = mongoose.connect(mongoDB, {   })
// var connection = mongoose.connect(mongoDB, err=>{
//   if(error) {
//     console.log(error);
//     console.log("Unable to connect to mongoDb: " + mongoDb)
//   }

//   console.log("mongoDb connection successful");
// })
// var connection = mongoose.connect(mongoDB)

var connection = mongoose.connect(mongoDB, {})

var db = mongoose.connection;
db.on('error', err=>{
  console.log("Unable to connect to mongoDb: " + mongoDB)
  console.log(err);
  console.log('try start mongodb server:> mongod --bind_ip_all &')
});
db.once('open', ()=>{
  serverStatus.mongoDb_isConnected = true;
  console.log("mongoDb connection successful");
})





//=== SET express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.serverStatus = serverStatus
  next();
});

// app.use('/',function (req, res, next) {
//     req.params = "statussssssss"
//     next();        
// } ,index);
app.use('/',index);
app.use('/calResponseTime', calResponseTime);
app.use('/reactTest', reactTest);
app.use('/users', users);
app.use('/jsRunner', jsRunner);
app.use('/jsRunnerApi', jsRunnerApi);
app.use('/memos', memos);
app.use('/memosApi', memosApi);
app.use('/sirFileFolderApi', sirFileFolderApi);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// console.log(require('./lib/getRoutes')(app._router && app._router.stack))
// console.log(app._router.stack)
// console.log(app._router)
// require('./lib/routesInfo')(app._router.stack, 'express');

// app._router.stack.forEach(function(r){
//   if (r.route && r.route.path){
//     console.log(r.route.path)
//   }
// })

module.exports = app;
