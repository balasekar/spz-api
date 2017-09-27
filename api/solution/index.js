const solutions = require('./solutions.json');

/** GET users listing. */
module.exports = {
    getSolutions(req, res) {
        res.json(solutions);
        return res;
    }
};
