const express = require('express');
const ordersRouter = express.Router();
const {getAllOrders, getOrdersByUser} = require("../db/models/orders")

//GET api/orders
ordersRouter.get('/', async (req, res) => {
    try{
        const orders = await getAllOrders();
        res.send(orders)
    } catch(error) {
        console.error(error)
    }
})

//GET orders/cart

//POST api/orders
// ordersRouter.post('/', async (req, res) => {
//     try{
        
//     } catch(error) {
//         throw error;
//     }

// })

//GET api/users/:userId/orders
ordersRouter.get('/', async (req, res) => {
    const {userId} = req.params;
    try{
        const userOrders = await getOrdersByUser(userId);
        res.send(userOrders);
    } catch(error) {
        console.error(error)
    }

})