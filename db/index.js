const config = require('config');
const pg = require('pg');
// ensure pg doesn't try to parse the dates (it gets it wrong when it's just a date).
// We use moment.utc() to parse the timestamps, so just tell pg not to modify the dates
pg.types.setTypeParser(1082, str => str);
pg.types.setTypeParser(1114, str => str);
pg.types.setTypeParser(1184, str => str);
let db = null;
module.exports = {
    // expose a connect method that connects to the database and returns the connection
    connect: () =>
        Promise.resolve().then(() => {
            const dbConfig = {
                host: config.get('postgres.host'),
                port: config.get('postgres.port'),
                database: config.get('postgres.db'),
                user: config.get('postgres.user'),
                password: config.get('postgres.password'),
                poolSize: config.get('postgres.poolSize'),
                poolIdleTimeout: config.get('postgres.poolIdleTimeout'),
                ssl: config.get('postgres.ssl'),
                application_name: config.get('postgres.applicationName')
            };
            db = new pg.Pool(dbConfig);
            db.on('error', (err) => {
                // if an error is encountered by a client while it sits idle in the pool
                // the pool itself will emit an error event with both the error and
                // the client which emitted the original error
                // this is a rare occurrence but can happen if there is a network partition
                // between your application and the database, the database restarts, etc.
                // and so you might want to handle it and at least log it out
                console.error('idle client error', err.message, err.stack);
            });

            return dbConfig;
        }),
    // expose a getConnection method that returns the connection to the database
    getConnection: () => db
};
