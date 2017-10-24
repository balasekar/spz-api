const queries = require('../../db/queries');

/** GET users listing. */
module.exports = {
    postRequest(req, res) {
        const userRequest = req.body;
        return queries.insertRequest([userRequest.name, userRequest.mail_id,
            userRequest.mobile_no, userRequest.requested_item, userRequest.comments])
            .then(() => res.json({ success: true }))
            .catch(error => res.status(500).json({ message: error.message }));
    }
};
