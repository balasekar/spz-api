const queries = require('../../db/queries');

/** GET users listing. */
module.exports = {
    getUsers(req, res) {
        console.log('req:', req);
        return res.json([{ id: 1, username: 'balas3kar' }, { id: 2, username: 'ssnfr0mspz' }]);
    },
    insertItems(req, res) {
        console.log('req.body:', req.body);
        return Promise.resolve().then(() => queries.insertItems([
            req.body.data,
            req.body.complete
        ])).then((result) => {
            console.log('result:', result);
            res.json(result);
            return res;
        });
    },
    getItems(req, res) {
        console.log('req.body:', req.body);
        return Promise.resolve().then(() => queries.getItems()).then((result) => {
            console.log('result:', result);
            res.json(result);
            return res;
        });
    },
    updateItems(req, res) {
        console.log('req.body:', req.body);
        console.log('req.param:', req.params);

        return Promise.resolve().then(() => queries.updateItems([
            req.body.data,
            req.body.complete,
            req.params.item_id
        ])).then((result) => {
            console.log('result:', result);
            res.json(result);
            return res;
        });
    }
};
