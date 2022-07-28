const express = require('express');
const order_productsRouter = express.Router();
const {updateOrderProduct, destroyOrderProduct} = require('../db/models/order_products');

//PATCH /order_products/:orderProductId
order_productsRouter.patch('/:orderProductId', async (req, res) => {
    const {id} = req.params;
    try{
        const patchedOrderProduct = await updateOrderProduct(id);

        res.send(patchedOrderProduct);

    } catch (error) {
        console.error(error)
    }
})

//DELETE /order_products/:orderProductId
order_productsRouter.delete('/:orderProductId', async (req, res) => {
    const {id} = req.params;
    try{
        const deletedOrderProduct = await destroyOrderProduct(id);

        res.send(deletedOrderProduct);

    } catch (error) {
        console.error(error)
    }
})

module.exports = order_productsRouter;