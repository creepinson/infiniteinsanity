'use strict'

//////EXPRESS////////
const express = require('express');
const app = express();
const database = require("./data.js");

var fs = require("fs");
var key = fs.readFileSync('encryption/privkey.pem');
var cert = fs.readFileSync( 'encryption/cert.crt' );
var ca = fs.readFileSync( 'encryption/cert.crt' );
var options = {
key: key,
cert: cert,
ca: ca,
passphrase: "theo814",
};


////////HTTP/////////
const http = require('https').createServer(options, app);

//Port and server setup
const port = 443;

//Server
let userRef = database.database.collection('users').doc('creepinson');
let getDoc = userRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('creepinson data:', doc.data());
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });

//Console the port
console.log('Server is running localhost on port: ' + port );

/////SOCKET.IO///////
const io = require('socket.io').listen(http);

http.listen(port);

////////EJS//////////
const ejs = require('ejs');

//Setup the views folder
app.set("views", __dirname + '/views');

//Setup ejs, so I can write HTML(:
app.engine('.html', ejs.__express);
app.set('view-engine', 'html');

//Setup the public client folder
app.use(express.static(__dirname + '/public'));

let clients = {}

//Socket setup
io.on('connection', client=>{

  console.log('User ' + client.id + ' connected, there are ' + io.engine.clientsCount + ' clients connected');

  //Add a new client indexed by his id
  clients[client.id] = {
    position: [0, 0, 0],
    rotation: [0, 0, 0]
  }

  //Make sure to send the client it's ID
  client.emit('introduction', client.id, io.engine.clientsCount, Object.keys(clients));

  //Update everyone that the number of users has changed
  io.sockets.emit('newUserConnected', io.engine.clientsCount, client.id, Object.keys(clients));

  client.on('move', (pos)=>{

    clients[client.id].position = pos;
    io.sockets.emit('userPositions', clients);

  });

  //Handle the disconnection
  client.on('disconnect', ()=>{

    //Delete this client from the object
    delete clients[client.id];

    io.sockets.emit('userDisconnected', io.engine.clientsCount, client.id, Object.keys(clients));

    console.log('User ' + client.id + ' dissconeted, there are ' + io.engine.clientsCount + ' clients connected');

  });

});

/////////////////////
//////ROUTER/////////
/////////////////////

//Client view
app.get('/', (req, res) => {

	res.render('index.html');

});

//404 view
app.get('/*', (req, res) => {

	res.render('404.html');

});
