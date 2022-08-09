const express = require('express');
const ordersRouter = express.Router();
const {getAllOrders, createOrder, getCartByUser,updatedOrder, cancelOrder} = require("../db/models/orders")
const {addProductToOrder} = require("../db/models/order_products")

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


// async function addProductToOrder({productId, orderId, price, quantity}) {
//     //console.log(productId, orderId, price, quantity)
//     try{
//         const {rows:[orderWithProducts]} = await client.query(`
//             INSERT INTO order_products ("productId", "orderId", price, quantity)
//             VALUES ($1, $2, $3, $4)
//             RETURNING *;
//         `, [productId, orderId, price, quantity]);

//        // console.log("order_products", orderWithProducts);
//         return orderWithProducts
//     } catch(error){
//         throw error
//     }
// }


//POST api/orders  NOT TESTED
ordersRouter.post('/', async (req, res) => {
    console.log(req.body)
    try {

            const {status} = req.body.order;
            const {userId} = req.body.user;
            const {productId, price, quantity} = req.body.candle
            
            console.log(status, userId, productId, price, quantity)

        const order = await createOrder({status, userId, productId, price, quantity});
       // const orderId = order.id
    
        res.send({
            message: "You added the product to your order!"
        });
    
    } catch (error) {
        console.error(error);
    }
});

//POST api/orders/:orderId/products 
ordersRouter.post('/:orderId/products', async (req,res) => {
    //const {orderId} = req.params
    try{
       // const {productId, price, quantity} = req.body.candle
       // const addProduct = await addProductToOrder({productId, orderId, price, quantity})
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