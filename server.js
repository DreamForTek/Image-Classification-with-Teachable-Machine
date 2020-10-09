var express = require('express');
// Create the app
var app = express();


// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);


var lastlabel=""

var io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('label', (msg) => {
    // console.log('label: ' + msg);
    if(lastlabel!=msg){
      lastlabel=msg
      console.log(lastlabel);
      if(lastlabel=="Rui"){
        // player.play('boiola.mp3', function(err){
        //   if (err) throw err
        // })
      }
    }
  });
});
// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Application listening at http://' + host + ':' + port);
}

app.use(express.static('public'));