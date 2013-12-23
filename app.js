var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config');
var db = require('./lib/mongoose');


var app = express();

app.set('views',__dirname + '/templates');

var server = http.createServer(app);
var port = process.env.PORT || config.get('port');
server.listen(port, function(){
    console.log('Express server listening on port ' + config.get('port'));
});

var io = require('socket.io').listen(server);

app.use(function(err,req,res,next){
  if (app.get('env') == 'development'){

    var errorHandler = express.errorHandler();
     errorHandler(err,req,res,next);
  }else{
      res.send(500);
  }
});

if (app.get('env') == 'development'){
    app.use(express.logger('dev'));
}else{
    app.use(express.logger('default'));
}
app.get('/', function(req,res){
    res.render('index',{
    title: 'Chat'
    });
});
app.engine('ejs',require('ejs-locals'));

app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


app.use(express.favicon('./favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.session());

app.get('/', routes.index);
app.get('/friends', user.friends);





io.sockets.on('connection', function (socket) {
    socket.broadcast.emit('new', { message: 'New User was connected' });

    socket.on('messages', function (data) {
        socket.broadcast.emit('news', { message: data.message, name:data.name });
    });
});