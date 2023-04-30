const express = require('express');

const router = express.Router();
const mainController = require('../controllers');

router.use('/', require('./swagger'));
router.get('/', mainController.index);
router.use('/contacts', require('./contacts'));

router.get('*', (req, res) => {
    res.status(404).send('404 Not found.');
});

module.exports = router;
