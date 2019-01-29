var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var chat = io.of('/chat');

io.on('connection', function(socket){
	console.log('a user connected');
	socket.emit('news', 'Welcome to chat app');
	socket.on('chat message', function(msg){
		console.log(msg);
	  io.emit('chat message', msg);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})
});


app.use('/', indexRouter);
app.use('/users', usersRouter);



http.listen(port, function(){
  console.log('listening on *:' + port);
});

module.exports = app;

// var express = require('express');
// var app = express();
// var http = require('http').createServer(app);
// var cookieParser = require('cookie-parser');
// var io = require('socket.io')(http);
// var port = process.env.PORT || 3000;
// var path = require('path');

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//   res.render('index');
// });

// io.on('connection', function(socket){
// 	console.log('connected');
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, function(){
//   console.log('listening on *:' + port);
// });
