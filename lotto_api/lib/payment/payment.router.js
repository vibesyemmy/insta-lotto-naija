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
router.post('/', Controller.webhook);
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.destroy);

module.exports = router;