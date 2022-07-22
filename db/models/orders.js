const client = require('../client');

// async function createOrder({status, }) {
//     try{
//         const {rows:orders} = await client.query(`
           
//         `)
//     } catch(error) {
//         throw error;
//     }
// }

async function getAllOrders() {
    try{
        const {rows:orders} = await client.query(`
            SELECT * 
            FROM orders;
        `);
        console.log("orders?", orders)

        orders.map((order)=>{
            order.products = [];
        })

        const {rows:products} = await client.query(`
            SELECT * 
            FROM order_products;
        `);
        console.log("products?",products)

       const ordersWithProducts = orders.map((order)=> {
                                        products.map((product)=>{
                                            if(order.id === product.orderId) {
                                                order.products.push(product);
                                            };
                                        });
                                    });
        console.log("orders with products?", ordersWithProducts)
        return ordersWithProducts;
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

async function getOrdersByUser({id}) {
    console.log('getOrdersByUser id passed in:', id)
    try{
        const allOrders = await getAllOrders();
        const orderByUserId = allOrders.filter((order)=>{
            if (order.userId === id) {
                return true;
            };
        });
        console.log("orderByUserId?", orderByUserId);
        return orderByUserId;

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
}


module.exports = {
    getAllOrders,
    getOrdersByProduct,
    getOrderById, 
    getOrdersByUser
  }

