const mongodb = require('../../mongoDB');

/** GET users listing. */
module.exports = {
    getClients(req, res) {
        mongodb.getDB().collection('clients').find().toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
};
