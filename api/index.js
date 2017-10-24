const express = require('express');

const router = express.Router();

const product = require('./product');
const client = require('./client');
const solution = require('./solution');
const userRequest = require('./request');

router.get('/product', product.getProducts);
router.get('/client', client.getClients);
router.get('/solution', solution.getSolutions);
router.post('/request', userRequest.postRequest);

module.exports = router;
