const mongodb = require('../db/connect');

const index = async (req, res) => {
    const result = await mongodb.getDb().db().listCollections();
    result.toArray().then((list) => {
        // res.setHeader('Content-Type', 'application/json');
        res.status(200).send(list.map((item) => item.name).join('<br>'));
    });
};

module.exports = { index };
