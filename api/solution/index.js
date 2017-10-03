const mongodb = require('../../mongoDB');

module.exports = {
    getSolutions(req, res) {
        mongodb.getDB().collection('solutions').find().toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
    }
};
