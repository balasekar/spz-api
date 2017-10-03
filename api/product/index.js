const mongodb = require('../../mongoDB');

/** GET users listing. */
module.exports = {
    getProducts(req, res) {
        mongodb.getDB().collection('products').find().toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
};
