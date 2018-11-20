/* eslint-disable no-unused-vars */
const Ticket = require('./ticket.model'),
	md5 = require('js-md5'),
	moment = require('moment'),
	_ = require('lodash');
const Controller = {};
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
			if (!user) throw new Parse.Error('You must be logged in to create a ticket');
			if (!ticket) throw new Parse.Error('You cannot save a null ticket');

			// New Ticket
			if (!ticket.existed()) {
				const startDate = new moment(d).subtract(3, 'day');
				startDate.startOf('day');
				const endDate = new moment(startDate).add(3, 'day');

				// find ticket with picked number
				// TODO: Limit search to the past three days
				const tQ = new Parse.Query('Ticket');
				tQ.equalTo('numbers', ticket.get('numbers'));
				tQ.greaterThanOrEqualTo('createdAt', startDate.toDate());
				tQ.lessThan('createdAt', endDate.toDate());
				tQ.lessThan('drawCount', 9);
				tQ.equalTo('picked', false);

				// Determine if ticket already exists and throw error if it does
				const t = await tQ.first();
				if (t) throw new Error('These numbers have been picked');

				const acl = new Parse.ACL();
				acl.setPublicReadAccess(true);
				acl.setRoleWriteAccess('admin', true);

				ticket.setACL(acl);
				const seed = `${user.id}-${new Date()}`;
				ticket.set('hash', md5.hex(seed));
				ticket.set('picked', false);
				ticket.set('drawCount', 0);
			}
		} catch (error) {
			throw error;
		}
	};
};

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
	const startDate = new moment(d).subtract(3, 'day');
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