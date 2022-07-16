const express = require('express');
const usersRouter = express.Router();
const {getAllUsers} = require("../db/models/user")


usersRouter.get('/', async (req, res) => {
    try{
        const users = await getAllUsers();
        res.send(users)
    } catch(error) {
        console.error(error)
    }
})

module.exports = usersRouter