const express = require('express');
const reviewsRouter = express.Router();
const {getAllReviews} = require('../db/models/reviews')

//GET api/reviews
reviewsRouter.get('/', async (req, res) => {
    try{
        const reviews = await getAllReviews();
        res.send(reviews);

    } catch(error){
        throw(error)
    }
})


module.exports = reviewsRouter;