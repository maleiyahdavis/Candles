const express = require('express');
const ordersRouter = express.Router();
const {getAllOrders, getOrdersByUser, createOrder} = require("../db/models/orders")

//GET api/orders
ordersRouter.get('/', async (req, res) => {
    try{
        const orders = await getAllOrders();
        res.send(orders)
    } catch(error) {
        console.error(error)
    }
})

//POST orders/cart



//POST api/orders  NOT TESTED
ordersRouter.post('/', async (req, res) => {
    try {
        const order = await createOrder(req.body);
    
        res.send(order);
    
    } catch (error) {
        next(error)
    }
})

//GET api/users/:userId/orders
ordersRouter.get('/', async (req, res) => {
    const {userId} = req.params;
    try{
        const userOrders = await getOrdersByUser(userId);
        res.send(userOrders);
    } catch(error) {
        console.error(error)
    }

});

module.exports = ordersRouter;