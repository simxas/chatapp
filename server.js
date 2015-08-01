// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();

var _ = require("underscore");

var http = require('http').Server(app);
var io = require('socket.io')(http);

// var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');

var fs = require('fs');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var path = require('path');


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
// app.use(bodyParser()); // get information from html forms

app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	limit: '50mb',
  extended: true
}));



app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
// app.listen(port);
http.listen(8080, function(){
  console.log('listening on *:8080');
});

//===================
//socketu dalis
//===================

var users = [];



io.on('connection', function(socket){
  console.log("-------------user connected--------------");
  // socket.emit('b', "belekas");
  socket.on('join', function (data) {
    socket.join(data.userName); // We are using room of socket io

    /*
    pushinu i users array atejusi useri kaip objekta
    */
    users.push({id: data.id, userName: data.userName, age: data.age, sex: data.sex, city: data.city});
    /*
    paduodu visiems klientams info apie prisijungusius userius
    */
    io.sockets.emit("newConnection", {users: users});
    console.log(users);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    users = _.without(users,_.findWhere(users, {id: socket.id}));
    console.log(users);
    io.sockets.emit("userDisconnected", {id: socket.id, sender:"system", users: users});
  });

  socket.on('chat_message', function(data){
    console.log("Cia yra data is kliento: "+data.name);
    sendMessage(data);
  });
  function sendMessage(data){
    socket.in(data.to).emit('new_msg', {msg: data.msg, from: data.from, sex: data.sex, age: data.age, city: data.city});
  }
});//end of io.on()