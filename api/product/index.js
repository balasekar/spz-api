// const products = require('./products.json');
const mongoDB = require('../../mongoDB');
/** GET users listing. */
module.exports = {
    getProducts(req, res) {
        // res.json(products);
        mongoDB.connect();
        mongoDB.getConnection().collection('products').find({}).toArray((err, docs) => {
            if (err) {
                console.log(err);
                res.error(err);
            } else {
                res.json(docs);
            }
        }).then(() => res);
    }
};
