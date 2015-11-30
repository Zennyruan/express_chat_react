var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var jade = require('jade');
// var io = require('socket.io').listen(app);
var pseudoArray = ['admin']; //block the admin username (you can disable it)

app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
var engines = require('consolidate');

app.engine('jade', engines.jade);

app.engine('jsx', require('express-react-views').createEngine());
app.set('view options', {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('home.jade');
});
server.listen(3001);

io.sockets.on('connection', function(socket) {
  io.to(socket.id).emit('unique-message', socket.id);
  socket.on('message', function(data) {
    console.log(data)
  });
  socket.on('setUserName', function(data) {
    console.log(data);
  });
});
