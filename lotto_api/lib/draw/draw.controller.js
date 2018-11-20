const moment = require('moment');
const TicketController = require('../ticket/ticket.controller');
const Controller = {};

Controller.beforeSave = (Parse) => {
	return async (req) => {
		try {
			const draw = req.object;
			const ticket = TicketController.pick(Parse);

			if (!draw) throw new Parse.Error('You cannot save a null draw');
			if (!ticket) throw new Parse.Error('No valid ticket found.');

			const startOfTheDay = moment().startOf('d').toDate();
			const Q = new Parse.Query('Draw');
			Q.greaterThanOrEqualTo('createdAt', startOfTheDay);
			const count = await Q.count();

			if (count >= 3) {
				throw new Error('Too many draws made already');
			} else {
				if (!draw.existed()) {
					const acl = new Parse.ACL();
					acl.setPublicReadAccess(true);
					acl.setRoleWriteAccess('admin', true);

					draw.setACL(acl);
					draw.set('ticket', ticket);

					ticket.set('picked', true);

					await ticket.save(null, {
						useMasterKey: true
					});
				}
			}
		} catch (error) {
			throw error;
		}
	};
};

module.exports = Controller;