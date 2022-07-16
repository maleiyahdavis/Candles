const express = require('express');
const scentsRouter = express.Router();
const {getAllScentNames} = require('../db/models/scent_names')

//GET  /api/scents
scentsRouter.get('/', async (req, res) => {
    try{
        const scents = await getAllScentNames();
        res.send(scents);
    } catch(error) {
        console.error(error)
    }
})


module.exports = scentsRouter;