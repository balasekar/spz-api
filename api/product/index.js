const products = require('./products.json');
const connection = require('../../mongoDB').getConnection();
/** GET users listing. */
module.exports = {
    getProducts(req, res) {
        // res.json(products);
        connection.collection('products').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.json(docs);
            }
        });
        return res;
    }
};
