const crypto = require('crypto');
const secret = process.env.SECRET_KEY || 'sk_test_6dfbccfd9d90b44c0b0a48af63fb9c649faee59e';
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
        const opts = {
            event: event.event,
            tranx_id: event.data.id,
            domain: event.data.domain,
            status: event.data.status,
            reference: event.data.reference,
            amount: event.data.amount,
            gateway_response: event.data.gateway_response,
            paid_at: {
                "__type": "Date",
                "iso": event.data.paid_at
            },
            charge_created_at: {
                "__type": "Date",
                "iso": event.data.created_at
            },
            channel: event.data.channel,
            currency: event.data.currency,
            ip_address: event.data.ip_address
        };
        console.info("Request options", opts);
        try {
            await instance.post(`http://localhost:${PORT}/${mountPath}/classes/Payment`, opts);
            res.sendStatus(200);
        } catch (error) {
            console.error(error.message);
            res.sendStatus(404);
        }
    } else {
        console.error('Header is bad')
        res.sendStatus(400);
    }
}

Controller.beforeSave = (Parse) => {
    return async (req) => {
        const payment = req.object;
        const creditId = payment.get('reference');
        const cQ = new Parse.Query('Credit');
        cQ.equalTo('objectId', creditId);
        cQ.include('user');
        try {
            const credit = await cQ.first({
                useMasterKey: true
            });

            if (!credit) {
                throw new Parse.Error(404, "Credit not found");
            }
            const user = credit.get('user');
            const paymentACL = new Parse.ACL();
            paymentACL.setPublicReadAccess(false);
            paymentACL.setPublicWriteAccess(false);
            paymentACL.setRoleWriteAccess('admin', true);
            paymentACL.setRoleReadAccess('admin', true);
            paymentACL.setWriteAccess(user, false);
            paymentACL.setReadAccess(user, true);

            payment.setACL(paymentACL);
        } catch (error) {
            throw error;
        }

    }
}

Controller.afterSave = (Parse) => {
    return async (req) => {
        const payment = req.object;
        const creditId = payment.get('reference');
        const cQ = new Parse.Query('Credit');
        cQ.equalTo('objectId', creditId);

        try {
            const credit = await cQ.first({
                useMasterKey: true
            });

            if (!credit) {
                throw new Parse.Error(404, "Ticket not found");
            }

            const user = credit.get('user');

            if (payment.has('event') && payment.get('event') === 'charge.success' && !credit.get('paid')) {
                const wQ = new Parse.Query('Wallet');
                wQ.equalTo('user', user);
                let wallet = await wQ.first({
                    useMasterKey: true
                });
                if (!wallet) {
                    wallet = new Parse.Object('Wallet');
                    const walletACL = new Parse.ACL();
                    walletACL.setPublicReadAccess(false);
                    walletACL.setPublicWriteAccess(false);
                    walletACL.setRoleWriteAccess('admin', true);
                    walletACL.setRoleReadAccess('admin', true);
                    walletACL.setWriteAccess(user, false);
                    walletACL.setReadAccess(user, true);
                    wallet.set('user', user);
                    wallet.set('balance', credit.get('amount'));
                    wallet.setACL(walletACL);
                } else {
                    wallet.increment('balance', credit.get('amount'));
                }
                wallet.save(null, {useMasterKey: true});
                credit.set('paid', true);
                await credit.save(null, {
                    useMasterKey: true
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Controller;
