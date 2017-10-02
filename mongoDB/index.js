const mongodb = require('mongodb');

const MONGODB_URI = 'mongodb://spowerz:spowerz3515@cluster0-shard-00-00-dxplb.mongodb.net:27017,' +
    'cluster0-shard-00-01-dxplb.mongodb.net:27017,' +
    'cluster0-shard-00-02-dxplb.mongodb.net:27017/test?' +
    'ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';


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
