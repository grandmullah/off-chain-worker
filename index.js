const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require("http");
const cors = require('cors');
const routes = require('./controllers')
const { Server } = require("socket.io");
const { updateLocation } = require('./src/update_location');
const { requests } = require('./src/requests');



const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{ /* options */ });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 4000


io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  // ...
  socket.on("update-location", (arg) => {
     // world
     updateLocation(arg)
  });
  socket.on('request',async (arg)=> {
      const dd =  await requests(arg)
      console.log(dd)
  })
});

app.use(routes)

httpServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


