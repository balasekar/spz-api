const products = require('./products.json');

/** GET users listing. */
module.exports = {
    getProducts(req, res) {
        res.json(products);
        return res;
    }
};
