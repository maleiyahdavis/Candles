const express = require('express');
const candlesRouter = express.Router();
const {getAllCandles} = require("../db/models/candles")


//GET  /api/candles
candlesRouter.get('/', async (req, res) => {
    try{
        const candles = await getAllCandles();
        res.send(candles)
    } catch(error) {
        console.error(error)
    }
})

module.exports = candlesRouter;