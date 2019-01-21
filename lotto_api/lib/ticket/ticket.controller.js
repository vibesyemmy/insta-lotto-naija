/* eslint-disable no-unused-vars */
const Ticket = require('./ticket.model'),
	md5 = require('js-md5'),
	moment = require('moment'),
	_ = require('lodash');
const Controller = {};

const secret = process.env.SECRET_KEY || 'sk_test_6dfbccfd9d90b44c0b0a48af63fb9c649faee59e';
const axios = require('axios'),
instance = axios.create();

const ticketPrice = process.env.DEFAULT_TICKET_PRICE || 200 * 100;

const d = () => {
	return new Date();
};

Controller.create = async (req, res) => {
	try {
		const ticket = await Ticket.create(req.body);
		return res.json(ticket);
	} catch (ex) {
		return res.status(500).end();
	}
};

Controller.index = async (req, res) => {
	try {
		const tickets = await Ticket.find({});
		return res.json(tickets);
	} catch (error) {
		return res.status(500).end();
	}
};

Controller.get = async (req, res, next) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		if (!ticket) {
			return res.status(404).end();
		} else {
			return res.json(ticket);
		}
	} catch (error) {
		return res.status(500).end();
	}
};

Controller.destroy = async (req, res) => {
	try {
		const ticket = await Ticket.findByIdAndRemove(req.params.id);
		if (!ticket) {
			return res.status(404).end();
		} else {
			return res.json({
				'message': 'Ticket deleted successfully!'
			});
		}
	} catch (error) {
		return res.status(500).end();
	}
};

Controller.update = async (req, res) => {
	try {
		const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body);
		if (!ticket) {
			return res.status(404).end();
		} else {
			return res.json(ticket);
		}
	} catch (error) {
		return res.status(500).end();
	}
};

Controller.beforeSave = (Parse) => {
	return async (req) => {
		const user = req.user,
			ticket = req.object;
		try {
			if (!ticket) throw new Parse.Error(400, 'You cannot save a null ticket');

			// New Ticket
			if (!ticket.existed()) {
				if (!user) throw new Parse.Error(401, 'You must be logged in to create a ticket');
				// find ticket with picked number
				// TODO: Limit search to the past three days
				const sameNumberQ = new Parse.Query('Ticket');
				sameNumberQ.equalTo('number', ticket.get('number'));

				const t = await sameNumberQ.first();
				if (!isValidTicket(t)) {
					throw new Parse.Error(400, 'These numbers have been picked');
				} else {
					const acl = new Parse.ACL();
					acl.setPublicReadAccess(true);
					acl.setRoleWriteAccess('admin', true);
					acl.setWriteAccess(user, true);

					ticket.setACL(acl);
					const seed = `${user.id}-${new Date()}`;
					ticket.set('hash', md5.hex(seed));
					ticket.set('picked', false);
					ticket.set('drawCount', 0);
					ticket.set('player', user);
					ticket.set('paid', false);
				}
			}
		} catch (error) {
			throw error;
		}
	};
};

// Controller.afterSave = (Parse) => {
// 	return async(req) => {
// 		const baseURL = 'https://api.paystack.co/transaction/initialize';
// 		const ticket = req.object;
// 		const user = req.user;

// 		if (!ticket.existed()) {
// 			try {
// 				const res = await instance.post(baseURL, {
// 					'reference': `${ticket.id}`,
// 					'email': `${user.get('email')}`,
// 					'amount': `${ticketPrice}`
// 				}, {
// 					headers: {
// 						"Authorization": `Bearer ${secret}`,
// 						"Content-Type": "application/json"
// 					}
// 				});
	
// 				const d = res.data
// 				const authorization_url = d.data.authorization_url;
// 				const access_code = d.data.access_code;
// 				const message = d.message;
	
// 				ticket.set('authorization_url', authorization_url);
// 				ticket.set('access_code', access_code);
// 				ticket.set('message', message);
	
// 				ticket.save(null, { useMasterKey: true });
// 			} catch (error) {
// 				throw error;
// 			}
			
// 		}
// 	}
// }

function isValidTicket(ticket) {
	const begin = moment().subtract(3, 'days').startOf('day');
	if(ticket === undefined || ticket == null) {
		return true;
	} else if (moment(ticket.get("createdAt")).isBefore(begin)) {
		return true;
	} else if(ticket.get('drawCount') == 9) {
		return true;
	} else if(ticket.get("picked")){
		return true;
	} else {
		return false;
	}
}

Controller.incrementDrawCount = (Parse) => {
	return async (req) => {
		const startDate = new moment(d).subtract(3, 'day');
		startDate.startOf('day');
		const endDate = new moment(startDate).add(3, 'day');
		const tQ = new Parse.Query('Ticket');
		tQ.greaterThanOrEqualTo('createdAt', startDate.toDate());
		tQ.lessThan('createdAt', endDate.toDate());
		tQ.lessThan('drawCount', 9);
		tQ.equalTo('picked', false);
		try {
			const tickets = tQ.find();
			_.each(tickets, (ticket) => incrementDealCount(req, ticket));
		} catch (error) {
			throw error;
		}
	};
};

async function incrementDealCount(req, ticket) {
	ticket.increment('drawCount');
	try {
		await ticket.save(null, {
			useMasterkey: true
		});
		req.message(`${ticket.id} saved.`);
	} catch (error) {
		throw error;
	}
}

Controller.pick = async (Parse) => {
	const tQ = getValidTicketQuery(Parse);
	try {
		const count = tQ.count();
		tQ.limit(count);
		const tickets = tQ.find();
		const index = Math.floor(Math.random() * (count + 1));
		return tickets[index];
	} catch (error) {
		throw error;
	}
};

function getValidTicketQuery(Parse) {
	const startDate = new moment().subtract(3, 'day');
	startDate.startOf('day');
	const endDate = new moment(startDate).add(3, 'day');
	const tQ = Parse.Query('Ticket');
	tQ.greaterThanOrEqualTo('createdAt', startDate.toDate());
	tQ.lessThan('createdAt', endDate.toDate());
	tQ.lessThan('drawCount', 9);
	tQ.equalTo('picked', false);
	return tQ;
}

module.exports = Controller;