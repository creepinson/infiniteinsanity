const express = require("express");
var fs = require("fs");

const app = express();
const http = require("http").createServer(app);

// Port and server setup
const port = process.env.PORT || 3000;

// Console the port
console.log("Server is running localhost on port: " + port);

///// SOCKET.IO
const io = require("socket.io").listen(http);

// Setup the views folder
app.set("views", __dirname + "/views");

// Setup ejs
app.set('view engine', 'ejs');

// Setup the public client folder
app.use(express.static(__dirname + "/public"));

let clients = {};

// Socket setup
io.on("connection", (client) => {
  console.log(
    "User " +
      client.id +
      " connected, there are " +
      io.engine.clientsCount +
      " clients connected"
  );

  //Add a new client indexed by his id
  clients[client.id] = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  };

  //Make sure to send the client it's ID
  client.emit(
    "introduction",
    client.id,
    io.engine.clientsCount,
    Object.keys(clients)
  );

  //Update everyone that the number of users has changed
  io.sockets.emit(
    "newUserConnected",
    io.engine.clientsCount,
    client.id,
    Object.keys(clients)
  );

  client.on("move", (pos) => {
    clients[client.id].position = pos;
    io.sockets.emit("userPositions", clients);
  });

  // Handle the disconnection
  client.on("disconnect", () => {
    // Delete this client from the object
    delete clients[client.id];

    io.sockets.emit(
      "userDisconnected",
      io.engine.clientsCount,
      client.id,
      Object.keys(clients)
    );

    console.log(
      "User " +
        client.id +
        " dissconeted, there are " +
        io.engine.clientsCount +
        " clients connected"
    );
  });
});

// Client view
app.get("/", (req, res) => {
  res.render("index");
});

// 404 view
app.get("/*", (req, res) => {
  res.render("404");
});

http.listen(port);
