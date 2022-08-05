const express = require('express');
const ordersRouter = express.Router();
const {getAllOrders, createOrder, getCartByUser,updatedOrder, cancelOrder} = require("../db/models/orders")

//GET api/orders
ordersRouter.get('/', async (req, res) => {
    try{
        const orders = await getAllOrders();
        res.send(orders)
    } catch(error) {
        console.error(error)
    }
})

//POST orders/cart //NOT TESTED
ordersRouter.post('/cart', async(req,res) => {
    console.log("test",req.user)
    //WHERE DO WE GET ID
    //req.body.user.id? something along these lines
    try{
        const userCart = await getCartByUser(1)

        res.send(userCart);

    } catch(error) {
       console.error(error);
    }
})


//POST api/orders  NOT TESTED
ordersRouter.post('/', async (req, res) => {
    try {
        const order = await createOrder(req.body);
    
        res.send(order);
    
    } catch (error) {
        console.error(error);
    }
});

//POST api/orders/:orderId/products 
ordersRouter.post('/:orderId/products', async (req,res) => {
    const {orderId} = req.params
    try{
        //add single product to order (using order_products)
        //prevent duplication on orderId or productID pair
        //if product already exists on order, increment quantity and update price

    } catch(error) {
        console.error(error);
    }

});

//PATCH /api/orders/:orderId      NOT TESTED
ordersRouter.patch('/:orderId', async (req, res) => {
    const {orderId} = req.params;
    //HOW DO WE GET STATUS AND USER ID
    try {
        const updatedOrder = await updatedOrder({orderId}) 
    
        res.send(updatedOrder);
    
    } catch (error) {
        console.error(error);
    }
});

//DELETE /api/orders/:orderId       NOT TESTED
ordersRouter.delete('/:orderId', async (req, res) => {
    const {orderId} = req.params;
 
    try {
        const deletedOrder = await cancelOrder(orderId)
    
        res.send(deletedOrder);
    
    } catch (error) {
        console.error(error);
    }
});

module.exports = ordersRouter;