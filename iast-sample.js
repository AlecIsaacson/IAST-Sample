var newrelicFacade = require('./instrumentation/nodeagentfacade');
var logger = require("./logger")
var express = require('express')
var mysql = require('mysql')
var bodyParser = require('body-parser')
var fs = require('fs')
var tron_helpers = require('./tron_helpers');
var needle = require('needle');

logger.init()

var poolCluster = mysql.createPoolCluster()

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/', function (req, res) {
  logger.info('New request: ' + req.url)
  res.end("Nodetron is in good health");
})

app.get('/about', function(request, response){
  var params = request.params;
  if (request.query['mime'] == 'plain'){
    var mime = 'plain';
      } else {
    var mime = 'html';
      };
  if (request.query['url'] ){
      // console.log('URL specified');
      var url = request.query['url'];
  } else {
      // console.log('URL not specified');
      response.redirect('/about?url=https://example.com/');
      // response.writeHead(200, {'Content-Type': 'text/'+mime});
      // response.write('Acme Commerce v1.0');
      // response.end();
  }

  logger.info('New request: ' + request.url);

  if ( url ){
    needle.get(url, { timeout: 3000 }, function(error, response1) {
      if (!error && response1.statusCode == 200) {
        response.writeHead(200, {'Content-Type': 'text/'+mime});
        // console.log(response1.body);
        response.write(response1.body);
        response.end();
      } else {
        response.writeHead(404, {'Content-Type': 'text/'+mime});
        response.end();
        logger.info('error')
      }
    });
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  logger.info(`Started NODETRON server on host ${host} and port: ${port}`)
})

module.exports = app
