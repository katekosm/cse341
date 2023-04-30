const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const collectionName = 'contacts';

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection(collectionName).find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection(collectionName).find({ _id: userId });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db().collection(collectionName).insertOne(contact);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while creating the contact.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateContact = async (req, res) => {
    try {
        let id = req.params.id;
        if (id === 'undefined') {
            const lastRecord = await getLastRecord();
            id = lastRecord._id;
        }
        const userId = new ObjectId(id);
        // be aware of updateOne if you only want to update specific fields
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection(collectionName)
            .replaceOne({ _id: userId }, contact);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while updating the contact.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteContact = async (req, res) => {
    try {
        let id = req.params.id;
        if (id === 'undefined') {
            const lastRecord = await getLastRecord();
            id = lastRecord._id;
        }
        const userId = new ObjectId(id);
        const response = await mongodb
            .getDb()
            .db()
            .collection(collectionName)
            .remove({ _id: userId }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(
                response.error || 'Some error occurred while deleting the contact.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getLastRecord = async () => {
    const lastRecord = await mongodb
        .getDb()
        .db()
        .collection(collectionName)
        .find({})
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

    return lastRecord[0];
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};
