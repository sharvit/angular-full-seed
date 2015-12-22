(function() {

  'use strict';

  var express = require('express');
  var server = express();

  // user express to serve the static release files
  server.use(express.static(__dirname + '/build/release'));

  // html5mode
  server.get('/*', function(req, res) {
    // Use res.sendFile, as it streams instead of reading the file into memory.
    res.sendFile(__dirname + '/build/release/index.html');
  });

  // run the server and start listen to the port
  server.listen(process.env.PORT || 3000);

})();