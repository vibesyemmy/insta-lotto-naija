const crypto = require('crypto');
const secret = process.env.SECRET_KEY;
const axios = require('axios');
const PORT = process.env.PORT || 3000,
mountPath = process.env.PARSE_MOUNT || 'api',
APP_ID = process.env.APP_ID || 'abcd',
MASTER_KEY = process.env.MASTER_KEY || 'efgh',
Controller = {},
instance = axios.create();

instance.defaults.headers.common['X-Parse-Application-Id'] = APP_ID;
instance.defaults.headers.common['X-Parse-Master-Key'] = MASTER_KEY;
instance.defaults.headers.common['Content-Type'] = 'application/json';

Controller.webhook = async (req, res) => {
    const event = req.body;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
        try {
            await instance.post(`http://localhost:${PORT}/${mountPath}/classes/Payment`,{
                event: event.event,
                id: event.data.id,
                domain: event.data.domain,
                status: event.data.status,
                reference: event.data.reference,
                amount: event.data.amount,
                message: event.data.message,
                gateway_response: event.data.gateway_response,
                paid_at: event.data.paid_at,
                charge_created_at: event.data.created_at,
                channel: event.data.channel,
                currency: event.data.currency,
                ip_address: event.data.ip_address
            });
            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            res.sendStatus(400);
        }
    }
}

Controller.beforeSave = (Parse) => {
    return async (req) => {
        const payment = req.object;
        const ticketId = payment.get('reference');
        const tQ = new Parse.Query('Payment');
        tQ.equalTo('objectId', ticketId);
        tQ.include('player');
        const ticket = await tQ.first();

        if (!ticket) {
            throw new Error("Ticket not found");
        }
        const user = ticket.get('player');
        const paymentACL = new Parse.ACL();
        paymentACL.setPublicReadAccess(false);
        paymentACL.setPublicWriteAccess(false);
        paymentACL.setRoleWriteAccess('admin', true);
        paymentACL.setRoleReadAccess('admin', true);
        paymentACL.setWriteAccess(user, false);
        paymentACL.setReadAccess(user, true);

        payment.setACL(paymentACL);
    }
}

module.exports = Controller;
