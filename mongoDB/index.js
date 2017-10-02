const mongodb = require('mongodb');

const MONGODB_URI = process.env.MONGO_URI;


let db = null;
// Initialize connection once
module.exports = {
    connect: () =>
        Promise.resolve().then(() => {
            mongodb.MongoClient.connect(MONGODB_URI, (err, database) => {
                if (err) throw err;
                db = database;
            });
        }),
    getConnection: () => db
};
