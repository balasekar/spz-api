// const products = require('./products.json');
const mongodb = require('mongodb');
const MONGODB_URI = process.env.MONGO_URI;

/** GET users listing. */
module.exports = {
    getProducts(req, res) {
        // res.json(products);
        mongodb.MongoClient.connect(MONGODB_URI, (err, database) => {
            if (err) throw err;
            database.collection('products').find().toArray((err1, result) => {
                if (err1) throw err1;

                console.log(result);
                res.json(result);
            });
        });
    }
};
