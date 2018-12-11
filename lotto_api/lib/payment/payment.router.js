import {
	Router
} from 'express';
import Controller from './payment.controller';
const router = Router();

router.get('/', (_, res) => {
    res.json({message: "This is the payment end point"});
});
// router.get('/:id', Controller.get);
// router.post('/', Controller.create);
// router.put('/:id', Controller.update);
// router.delete('/:id', Controller.destroy);
router.post('/webhook', Controller.webhook);

module.exports = router;