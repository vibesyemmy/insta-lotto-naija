const moment = require('moment');
const TicketController = require('../ticket/ticket.controller');
const Controller = {};

Controller.afterSave = (Parse) => {
	return async(req) => {
		const draw = req.object;
		try {
			if (!draw.existed()) {
				const ticket = draw.get('ticket');
				ticket.set('picked', true);
				await ticket.save(null, {
					useMasterKey: true
				});
			}
		} catch (error) {
			throw error;
		}
	}
}

Controller.beforeSave = (Parse) => {
	const maxDrawCount = process.env.MAX_DRAW_COUNT || 3;
	return async (req) => {
		try {
			const draw = req.object;
			// Pick a random ticket as winner
			const ticket = TicketController.pick(Parse);

			if (!draw) throw new Parse.Error(400, 'You cannot save a null draw');
			if (!ticket) throw new Parse.Error(400, 'No valid ticket found.');

			const startOfTheDay = moment().startOf('d').toDate();
			const Q = new Parse.Query('Draw');
			Q.greaterThanOrEqualTo('createdAt', startOfTheDay);
			const count = await Q.count();

			if (count >= maxDrawCount) {
				throw new Parse.Error('Too many draws made already');
			} else {
				if (!draw.existed()) {
					const acl = new Parse.ACL();
					acl.setPublicReadAccess(true);
					acl.setRoleWriteAccess('admin', true);

					draw.setACL(acl);
					draw.set('ticket', ticket);

					ticket.set('picked', true);
				}
			}
		} catch (error) {
			throw error;
		}
	};
};

module.exports = Controller;