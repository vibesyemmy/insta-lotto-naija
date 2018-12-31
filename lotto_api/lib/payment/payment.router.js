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
    } else {
        res.sendStatus(400);
    }
});
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.destroy);
router.post('/webhook', Controller.webhook);

module.exports = router;