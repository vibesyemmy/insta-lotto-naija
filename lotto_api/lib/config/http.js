const secret = process.env.SECRET_KEY || 'sk_test_6dfbccfd9d90b44c0b0a48af63fb9c649faee59e';
const axios = require('axios'),
instance = axios.create();
module.exports = {
    http: instance,
    baseURL: 'https://api.paystack.co/transaction/initialize',
    headers: {
        "Authorization": `Bearer ${secret}`,
        "Content-Type": "application/json"
    }
}