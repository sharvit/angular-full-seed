var express = require('express');
var server = express();

// user express to serve the static release files
server.use(express.static(__dirname + '/build/release'));

// run the server and start listen to the port
server.listen(process.env.PORT || 3000);