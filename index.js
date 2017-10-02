const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./db');
const mongoDB = require('./mongoDB');
const config = require('config');
const api = require('./api');

const app = express();

app.use((req, res, next) => {
    // Websites allowed to connect
    res.setHeader('Access-Control-Allow-Origin', config.get('allowOriginUrl'));

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // intercepts OPTIONS method
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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

    // attempt to connect to the mongoDB
    mongoDB
        .connect()
        .then(() => {
            console.info('Connected to the mongoDB');
        })
        .catch((err) => {
            console.error('Unable to connect to mongoDB', err);
        });

    // attempt to start the webserver
    try {
        app.listen(process.env.PORT || config.get('port'));
        console.info(`spz-api started on port ${process.env.PORT} or ${config.get('port')}`);
    } catch (err) {
        console.log(err);
    }
}
www();

module.exports = app;
