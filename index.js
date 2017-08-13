const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./db');
const config = require('config');
const api = require('./api');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// All ready to go.. lets connect to things and start the webserver
function www() {
    // attempt to connect to the db
    db
        .connect()
        .then((dbConfig) => {
            console.info(`Connected to Postgres at ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
        })
        .catch((err) => {
            console.error('Unable to connect to Postgres', err);
        });

    // attempt to start the webserver
    try {
        app.listen(config.get('port'));
        console.info(`spz-api started on port ${config.get('port')}`);
    } catch (err) {
        console.log(err);
    }
}
www();

module.exports = app;
