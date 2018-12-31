import {
	Router
} from 'express';
import Controller from './payment.controller';
const crypto = require('crypto'),
secret = process.env.SECRET_KEY || 'sk_test_6dfbccfd9d90b44c0b0a48af63fb9c649faee59e',
axios = require('axios'),
PORT = process.env.PORT || 3000,
mountPath = process.env.PARSE_MOUNT || 'api',
APP_ID = process.env.APP_ID || 'abcd',
MASTER_KEY = process.env.MASTER_KEY || 'efgh',
router = Router(),
instance = axios.create();

instance.defaults.headers.common['X-Parse-Application-Id'] = APP_ID;
instance.defaults.headers.common['X-Parse-Master-Key'] = MASTER_KEY;
instance.defaults.headers.common['Content-Type'] = 'application/json';

router.get('/', (_, res) => {
    res.json({message: "This is the payment end point"});
});
// router.get('/:id', Controller.get);
router.post('/', async (req, res) => {
    const event = req.body;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(event)).digest('hex');

    if (hash == req.headers['x-paystack-signature']) {
        const opts = {
            event: event.event,
            id: event.data.id,
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
});
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.destroy);
router.post('/webhook', Controller.webhook);

module.exports = router;