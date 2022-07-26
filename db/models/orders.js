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



async function addProductToOrder({productId, orderId, price, quantity}) {
    //console.log(productId, orderId, price, quantity)
    try{
        const {rows:[orderWithProducts]} = await client.query(`
            INSERT INTO order_products ("productId", "orderId", price, quantity)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [productId, orderId, price, quantity]);

       // console.log("order_products", orderWithProducts);
        return orderWithProducts
    } catch(error){
        throw error
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


module.exports = {
    getAllOrders,
    getOrdersByProduct,
    getOrderById, 
    getOrdersByUser,
    createOrder, 
    addProductToOrder,
   // getCurrentDate
  }

