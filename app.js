var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var jade = require('jade');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var chats = require('./routes/chats');
var socketHandlers = require('./routes/sockets');

// Model Variables
var Chat;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Create Logger
var logger = morgan('combined');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));

app.use('/', routes);
app.use('/chats', chats);

// Databse Setup
mongoose.connect("mongodb://localhost/db");
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Initialize DB Models
    Chat = require('./models/chatModel')(mongoose);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         console.log(err);
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.newChatRoom = function(name, time, location, range, next) {
    console.log("New room! name:", name," time:", time, " location:",location, " range:",range);
    time_limit = new Date();
    future = time_limit.getMinutes()+Number(time);
    time_limit.setMinutes(future);
    var newRoom = new Chat({
        "name" : name,
        "time_limit" : time_limit,
        "location" : location,
        "range" : range
    });
    newRoom.save(next);
}

app.chatRoomsInRange = function(location, done) {
    console.log("getting chat rooms in range...")
    Chat.findChatsInRange(location, done);
};

app.findChatRoom = function(roomId, done){
    Chat.findChatRoom(roomId, done);
}

// Set up socket handlers
socketHandlers(io);


module.exports.app = app;
module.exports.server = server; 
