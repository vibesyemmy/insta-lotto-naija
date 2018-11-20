import {
	createServer
} from 'http';
import app from './app';
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

createServer(app).listen(PORT);