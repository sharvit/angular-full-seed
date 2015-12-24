(function() {

  'use strict';

  var express = require('express');
  var path = require('path');

  var PORT          = process.env.PORT || 3000;
  
  var RELEASE_PATH  = path.resolve(__dirname,       'build/release' );
  var INDEX_FILE    = path.resolve(RELEASE_PATH,    'index.html'    );


  var server = express();

  // user express to serve the static release files
  server.use(express.static(RELEASE_PATH));

  // html5mode
  server.get('/*', function(req, res) {
    // Use res.sendFile, as it streams instead of reading the file into memory.
    res.sendFile(INDEX_FILE);
  });

  // run the server and start listen to the port
  server.listen(PORT);

})();