/* eslint-disable max-len */
const _ = require('lodash');
const db = require('../db');
const config = require('config');
const format = require('pg-promise/lib/formatting').as.format;

// All the queries used by the application should be listed here
const queries = {
    testPostgres: 'SELECT 1;',
    insertItems: 'INSERT INTO test.items(text, complete) values($1::text, $2::boolean);',
    getItems: 'SELECT * FROM test.items ORDER BY id ASC;',
    updateItems: 'UPDATE test.items SET text=($1::text), complete=($2::boolean) WHERE id=($3);'
};

// loop through each query and turn it into a method that gets the database connection,
// runs the query and returns the result
module.exports = _.mapValues(queries, query =>
    values =>
        new Promise((resolve, reject) => {
            if (config.get('logQueries') === true) {
                console.log('Executing query:', format(query, values));
            }

            const dbc = db.getConnection();
            dbc.connect((err, client, done) => {
                if (err) {
                    return reject(err);
                }
                return client.query(query, values, (clientErr, result) => {
                    done(clientErr);
                    if (clientErr) {
                        return reject(clientErr);
                    }
                    return resolve(result.rows);
                });
            });
        }));
