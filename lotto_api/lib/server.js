import {
	createServer
} from 'http';
import express from 'express';
import bodyParser from 'body-parser';
const ParseServer = require('parse-server').ParseServer,
	PORT = process.env.PORT || 3000,
	mountPath = process.env.PARSE_MOUNT || 'api',
	hostName = process.env.HOST_NAME || 'localhost',
	APP_ID = process.env.APP_ID || 'abcd',
	MASTER_KEY = process.env.MASTER_KEY || 'efgh',
	PROD = process.env.PROD === 'true' || false,
	publicServerURL = PROD ? `https://${hostName}/${mountPath}` : `http://${hostName}:${PORT}/${mountPath}`,
	serverURL = `http://localhost:${PORT}/${mountPath}`;

const mongoDB = process.env.MONGO_DB;
const paymentRoutes = require('./payment/payment.router');

// Constants

// App
const app = express();
app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const api = new ParseServer({
	databaseURI: mongoDB,
	cloud: './lib/cloud/main.js',
	appId: APP_ID,
	masterKey: MASTER_KEY,
	serverURL: serverURL,
	publicServerURL: publicServerURL,
	allowClientClassCreation: false,
	liveQuery: {
		classNames: ['Ticket', 'Draw', 'Payment'],
		redisURL: `redis://${process.env.redisURL}:${process.env.redisPort}` || "redis://:{password}@redis-123456.c11.us-east-1-3.ec2.cloud.redislabs.com:18091", // this is optional, include only if you're using Redis
	}
});

app.use(`/${mountPath}`, api);
app.use('/payment', paymentRoutes);

createServer(app).listen(PORT);