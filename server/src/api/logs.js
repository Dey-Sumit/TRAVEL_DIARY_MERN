const express = require('express');
const LogEntry = require('../models/LogEntry')

const router = express.Router();

router.get('/', async (req, res, next) => {
    console.log("got req");
    try {
        const entries = await LogEntry.find();
        res.json(entries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {

    console.log(req.body);
    try {
        const logEntry = new LogEntry(req.body);
        const createEntry = await logEntry.save();
        res.json(createEntry)
    } catch (error) {
        next(error);
    }
})

module.exports = router;