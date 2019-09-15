const http = require('http');
const fs = require('fs');
const ws = new require('ws');

const wss = new ws.Server({noServer: true});

const clients = new Set();

const onSocketConnect = (ws) => {
  // Create new websocket connection
  clients.add(ws);

  ws.on('message', function(message) {
    // Listen for messages(json) and broadcasting to all client except initiator of message

    for(let client of clients) {
      if (client !== ws && client.readyState === ws.OPEN) {
        console.log("Message received and sent");
        client.send(message);
      } else {
        console.log("WebSocket DO NOT OPEN")
      }
    }
  });

  ws.on('close', function() {
    console.log(`WebSoket comnnection CLOSED`);
    clients.delete(ws);
  });
};

http.createServer(
  (req, res) => {
    let path = req.url.split('/')[1];

    // This 'if' upgrade protocol to websocket
    if (req.url == '/ws' && req.headers.upgrade &&
      req.headers.upgrade.toLowerCase() == 'websocket' &&
      req.headers.connection.match(/\bupgrade\b/i)) {
      wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
    } else if (path === '' || 'assets') { // stylesheets, scripts. index.html
      path === '' ? fs.createReadStream('./templates/index.html').pipe(res) : fs.createReadStream(`.${req.url}`).pipe(res);
    } else if (path === 'createUserOrAuthenticate') { 
      /*  
      For the sake of experimenting we would not create or aunthenticate user as a separate req,
      instead we would send user credentials with the message.
      */
    } else {
      res.writeHead(404);
      res.end();
    }
}
).listen(8080);