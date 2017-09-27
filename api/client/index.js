const clients = require('./clients.json');

/** GET users listing. */
module.exports = {
    getClients(req, res) {
        res.json(clients);
        return res;
    }
};