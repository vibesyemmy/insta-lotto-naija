/* eslint-disable no-undef */
const TicketController = require('../ticket/ticket.controller');
const DrawController = require('../draw/draw.controller');
const PaymentController = require('../payment/payment.controller');
const CreditController = require('../credits/credits');

Parse.Cloud.beforeSave('Ticket', TicketController.beforeSave(Parse));
Parse.Cloud.afterSave('Ticket', TicketController.afterSave(Parse));
Parse.Cloud.beforeSave('Draw', DrawController.beforeSave(Parse));
Parse.Cloud.beforeSave('Payment', PaymentController.beforeSave(Parse));
Parse.Cloud.afterSave('Payment', PaymentController.afterSave(Parse));
Parse.Cloud.beforeSave('Credit', CreditController.beforeSave(Parse));
Parse.Cloud.afterSave('Credit', CreditController.afterSave(Parse));
Parse.Cloud.job('incrementTicketDrawCount', TicketController.incrementDrawCount(Parse));

Parse.Cloud.afterSave(Parse.User, async (req) => {
    const user = req.object;

    if (!user.existed()) {
        const roleQuery = new Parse.Query(Parse.Role);
        roleQuery.equalTo('name', 'user');

        try {
            const role = await roleQuery.first({
                useMasterKey: true
            });
            if (!role) throw new Error('Role not found');

            const relation = role.relation('users');

            relation.add(user);

            await role.save(null, {
                useMasterKey: true
            });

            const wallet = new Parse.Object('Wallet');
            const walletACL = new Parse.ACL();
            walletACL.setPublicReadAccess(false);
            walletACL.setPublicWriteAccess(false);
            walletACL.setRoleWriteAccess('admin', true);
            walletACL.setRoleReadAccess('admin', true);
            walletACL.setWriteAccess(user, false);
            walletACL.setReadAccess(user, true);
            wallet.set('user', user);
            wallet.set('balance', 0);
            wallet.setACL(walletACL);

            wallet.save(null, {useMasterKey: true});
        } catch (error) {
            throw error;
        }
    }
});