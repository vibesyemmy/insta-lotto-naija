var express = require('express');
var cors = require('cors')
var ParseServer = require('parse-server').ParseServer;

var app = express();
app.use(cors());


app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// We include the lines below so that we can hit `/` and it passes the Elastic Beanstalk Health Check
app.get('/', function(_, res) {
  res.status(200).send('Make sure to star the parse-server repo on GitHub!');
});

var port = process.env.PORT || 1338;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

ParseServer.createLiveQueryServer(httpServer, {
  appId: process.env.APP_ID, // same as index.js file below
  masterKey: process.env.MASTER_KEY, // same as index.js file below
  serverURL: process.env.SERVER_URL || "localhost", // socket.myApp.com
  redisURL: `redis://${process.env.redisURL}:${process.env.redisPort}` || "redis://:{password}@redis-123456.c11.us-east-1-3.ec2.cloud.redislabs.com:18091", // this is optional, include only if you're using Redis
  websocketTimeout: 10 * 1000,
  cacheTimeout: 60 * 600 * 1000,
  verbose: process.env.VERBOSE_KEY || false,
});