const express = require('express');
const user = require('./user');
const product = require('./product');
const client = require('./client');
const solution = require('./solution');


const router = express.Router();
router.get('/user', user.getUsers);
router.post('/item', user.insertItems);
router.get('/item', user.getItems);
router.put('/item/:item_id', user.updateItems);
router.get('/product', product.getProducts);
router.get('/client', client.getClients);
router.get('/solution', solution.getSolutions);

module.exports = router;
