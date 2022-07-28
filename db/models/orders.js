const client = require('../client');


async function createOrder({status, userId}) {

    try{
        const {rows:orders} = await client.query(`
            INSERT INTO orders (status, "userId", "datePlaced")
            VALUES ($1, ${userId}, CURRENT_DATE)
            RETURNING *;
        `, [status]);

        //console.log("Orders :", orders);
        return orders
    } catch(error) {
        throw error;
    }
}

async function getAllOrders() {
    try{
        const {rows:orders} = await client.query(`
            SELECT * 
            FROM orders;
        `);
       
        orders.map((order)=>{
            order.products = [];
        })

        const {rows:products} = await client.query(`
            SELECT * 
            FROM order_products;
        `);
       
        orders.map((order)=> {
            products.map((product)=>{
                 if(order.id === product.orderId) {
                     order.products.push(product);
                 };
            });
         });
        //console.log("orders with products", orders)
        return orders;
    } catch(error) {
        throw error;
    }
}

async function getOrderById(id) {

    try{
        const allOrders = await getAllOrders();
        const orderById = allOrders.filter((order)=>{
            if(order.id === id) {
                return true;
            };
        });
        console.log("orderById?", "id:", id, orderById);

        return orderById;

    } catch(error) {
        throw error;
    }
}

async function getOrdersByUser(id) {
    //console.log('getOrdersByUser id passed in:', id)
    try{
        const allOrders = await getAllOrders();
        const ordersByUser = [];
        
       allOrders.map((order)=>{
            if (order.userId == id) {
                ordersByUser.push(order);
            };
        });
        //console.log("orderByUserId:", ordersByUser);
        return ordersByUser;

    } catch(error) {
        throw error;
    }
}

async function getOrdersByProduct({id}){
    console.log('getOrdersByProduct id passed in:', id)
    try{
        const allOrders = await getAllOrders();
        const orderByProductId = allOrders.map((order)=>{
            const theOrdersProducts = order.products;
            console.log("only the products of this order", theOrdersProducts)
                theOrdersProducts.map((product)=>{
                    if (product.productId === id) {
                        return order;
                    }
                });
        });
        console.log("the order by product id?", orderByProductId);
        return orderByProductId;

    } catch(error) {
        throw error;
    }
};

async function getCartByUser({id}) {
    try{
        const userOrder = await getOrdersByUser(id);

        if (userOrder.status === 'created') {
            return userOrder;
        }
    } catch(error) {
        console.error(error)
    }

};

async function updatedOrder({id, status, userId}) {
    try{
        const {rows:[updatedOrder]} = await client.query(`
            UPDATE orders
            SET status=${status}, "userId"=${userId}
            WHERE id=${id}
            RETURNING *;
        `);

        return updatedOrder
    } catch(error) {
        console.error(error);
    }
};

async function completeOrder({id}) {
    try{
        const {rows:[completedOrder]} = await client.query(`
            UPDATE orders
            SET status='completed'
            WHERE id=${id}
            RETURNING *;
        `)

        return completedOrder;

    } catch(error) {
        console.error(error)
    }
}

async function cancelOrder(id) {
    try{
        const {rows:[cancelledOrder]} = await client.query(`
            UPDATE orders
            SET status='cancelled'
            WHERE id=${id}
            RETURNING *;
        `)

        return cancelledOrder;

    } catch(error) {
        console.error(error)
    }
}


module.exports = {
    getAllOrders,
    getOrdersByProduct,
    getOrderById, 
    getOrdersByUser,
    createOrder, 
    getCartByUser,
    completeOrder,
    cancelOrder,
    updatedOrder
  }

