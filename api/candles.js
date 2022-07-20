const express = require('express');
const candlesRouter = express.Router();
const {getAllCandles, getCandleById} = require("../db/models/candles")


//GET  /api/candles
candlesRouter.get('/', async (req, res) => {
    try{
        const candles = await getAllCandles();
        res.send(candles)
    } catch(error) {
        console.error(error)
    }
})

candlesRouter.get('/:candleId', async (req, res) => {
    const {candleId} = req.params

    try {
        const candle = await getCandleById(candleId)
        res.send(candle)
    } catch (error) {
        console.error(error)
    }
})

module.exports = candlesRouter;