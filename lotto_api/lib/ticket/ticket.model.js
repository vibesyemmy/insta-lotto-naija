'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// export const TicketSchema = 

const TicketSchema = new Schema({
	name: {type: String, required: true},
	drawCount: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('Ticket', TicketSchema);