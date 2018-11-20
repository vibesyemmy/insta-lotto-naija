import mongoose from 'mongoose';

const db = {};

db.connect = async (connectionString) => {
	await mongoose.connect(connectionString, {
		useNewUrlParser: true
	});
};

module.exports = db;