const express = require('express');
const user = require('./user');

const router = express.Router();
router.get('/user', user.getUsers);
router.post('/item', user.insertItems);
router.get('/item', user.getItems);
router.put('/item/:item_id', user.updateItems);

module.exports = router;
