/* eslint-disable no-undef */
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

const dbName = process.env.DB_NAME || 'lotto';
const dbHost = process.env.DB_HOST || 'localhost';
const mongoDB = `mongodb://${dbHost}/${dbName}`,
	ParseDashboard = require('parse-dashboard');

// Constants

// App
const app = express();
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
	allowClientClassCreation: false
});

const dashboard = new ParseDashboard({
	'apps': [{
		'serverURL': serverURL,
		'appId': APP_ID,
		'masterKey': MASTER_KEY,
		'appName': 'Lotto'
	}]
});

app.use('/api', api);
app.use('/server/dashboard', dashboard);

app.listen(PORT, {
	app: process.env.APP_ID,
	host: process.env.HOST_NAME,
	master: process.env.MASTER_KEY
});
module.exports = app;