var renderer = require('./lib/renderer');

var express = require('express');
var router  = express.Router();



router.use(renderer(__dirname + '/views/', 'jade'));

router.get('/index', function (req, res) { res.render('index', req.query); } );

router.use(express.static(__dirname + '/public'));




// If this is being run as the root process, start the server
// Otherwise just expose the router.
if ( require.main === module ) {
    var app = express();
    app.use('/', router);
    var port = process.env.PORT || 8000;
    module.exports = app.listen(port, function() {
      console.log('Express server listening on port ' + port);
    });
}
else {
    console.log('Loaded as module.');
    module.exports = router;
}
    