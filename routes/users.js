var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json([{
        id: 1,
        username: "balas3kar"
    }, {
        id: 2,
        username: "ssnfr0mspz"
    }]);
});

module.exports = router;
