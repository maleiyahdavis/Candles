const client = require('../client');

async function getOrderProductById(id) {
    try{
        const {rows:[orderProduct]} = await client.query(`
            SELECT *
            FROM order_products
            WHERE idd=${id}
            RETURNING *;
        `)

        return orderProduct;
    } catch(error) {
        console.error(error)
    }
}

async function addProductToOrder({productId, orderId, price, quantity}) {
    console.log(productId, orderId, price, quantity)
    try{
        const {rows:[orderWithProducts]} = await client.query(`
            INSERT INTO order_products ("productId", "orderId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [productId, orderId, price, quantity]);

        //console.log("order_products", orderWithProducts);
        return orderWithProducts
    } catch(error){
        throw error
    }
}

async function updateOrderProduct({id, price, quantity}) {
    try{
        //does it need to update price/quantity separately?, but they techniqally should update together?
        const {rows:[updatedOrderProduct]} = await client.query(`
            UPDATE order_products
            SET price=${price}, quantitiy=${quantity}
            WHERE id=${id}
            RETURNING *;
        `)

        return updatedOrderProduct
    } catch(error) {
        console.error(error);
    }

};

async function destroyOrderProduct(id) {
    try{
        const {rows:[deletedRoutine]} = await client.query(`
            DELETE FROM order_products
            WHERE id = ${id}
            RETURNING *;
        `);
        console.log("Empty routine", deletedRoutine)
        return deletedRoutine
    } catch(error) {
        console.error(error);
    }
}

module.exports = {
    addProductToOrder,
    getOrderProductById,
    destroyOrderProduct,
    updateOrderProduct
  }