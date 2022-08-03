const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

const {
  createUser
} = require("./models/user");
const {
  createCandle
} = require("./models/candles")
const {
  createScent_Name
} = require("./models/scent_names")
const {
  createReview
} = require("./models/reviews")
const {
  createOrder,
  addProductToOrder
} = require("./models/order_products")

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping tables...");
    await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS candles;
      DROP TABLE IF EXISTS scent_name;
      DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables...")
    // drop tables in correct order

    console.log("Creating tables...")
    //does cart need an isPublic component?
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(255) NOT NULL,
        "lastName" VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "imageURL" TEXT NOT NULL DEFAULT 'https://pic.onlinewebfonts.com/svg/img_568656.png',
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE
      );`);
      
      await client.query(`
        CREATE TABLE scent_name (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL);
      `);
      
      await client.query(`
      CREATE TABLE candles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL NOT NULL,
        "imageURL" TEXT NOT NULL,
        "inStock" BOOLEAN NOT NULL DEFAULT FALSE,
        "scent_nameId" INTEGER REFERENCES scent_name(id) NOT NULL
      );`);
     
      await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        description TEXT NOT NULL,
        "candleReviewedId" INTEGER REFERENCES candles(id) NOT NULL,
        "userReviewingId" INTEGER REFERENCES users(id) NOT NULL
      );`);
      
      await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'created',
        "datePlaced" DATE NOT NULL,
        "userId" INTEGER REFERENCES users(id)
      );
      `);
      //PUT THIS BACK "datePlaced" DATE NOT NULL

      await client.query(`
      CREATE TABLE order_products (
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES candles(id),
        "orderId" INTEGER REFERENCES orders(id),
        price DECIMAL NOT NULL,
        quantity INTEGER DEFAULT 1
      );
      `);

      
    
    console.log("Finished creating tables...");
    // build tables in correct order
  } catch (error) {
    console.log("Error building tables!");
    throw error;
  }
}

async function populateInitialUsers() {
  try {
    console.log("Starting to create users...");
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    const usersToCreate = [
      {firstName: "Jeremy", lastName: "", email: "1", imageURL: "", username: "Jeremy", password: "Jeremy89", isAdmin: true}, //1
      {firstName: "Maleiyah", lastName: "", email: "2", imageURL: "", username: "Maleiyah", password: "Maxwell11", isAdmin: false}, //2
      {firstName: "Anna", lastName: "", email: "3", imageURL: "", username: "Anna", password: "Annabanana22", isAdmin: false}, //3
      {firstName: "Kiara", lastName: "", email: "4", imageURL: "", username: "Kiara", password: "Bates100", isAdmin: false} //4
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Users created:", users);
    console.log("Finished creating users!");
    
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
}

async function populateInitialScent_Names() {

  try{
    console.log("Starting to create scent!");

    const scent_namesToCreate = [ 
      {name:"Flowers"}, //1
      {name:"Fruity/Food"}, //2
      {name:"Seasonal"}, //3
      {name:"Fresh"}, //4
      {name:"Earthy"} //5
    ];
    //console.log(scent_namesToCreate);

    const scent_names = await Promise.all(scent_namesToCreate.map((createScent_Name)));
    console.log("Scent Name Created:", scent_names);
    console.log("Finished creating scent!");
  } catch(error){
    console.error("Error creating scent names");
    throw error;
  }
}

async function populateInitialCandles() {
  try{
    console.log("Starting to create candles...");

    const candlesToCreate = [
      {name:"Dark Mode", description:"The perfect late night candle.", price:16.99,imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true,scent_nameId:5}, //should scentname be a string or integer?
      {name: "BooleanBerry", description:"A berry blast that fills up a room.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:2},
      {name: "Byte sized Cookies", description:"One light, everybody knows the rules.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:2},
      {name: "Cup of Java", description:"The perfect morning blend.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:2},
      {name: "npm fart", description:"You know the smell.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:5},
      {name: "Debugger Daisies", description:"One of our best selling scents!", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:1},
      {name: "Error 404", description:"Will it ever be in stock?", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: false,scent_nameId: 5},
      {name:"Roses", description:"Perfect for a date night in.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: false, scent_nameId:1},
      {name:"Costal Breeze", description:"A vacation in a bottle.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:4},
      {name:"Euchalyptus", description:"You'll love it just as much as the koala", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:4},
      {name:"Christmas Wreath", description:"Gets you right in the Christmas spirit.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: false, scent_nameId:3},
      {name:"Pine Cones", description:"An autumn or winter scent to bring warmth to a chilly night.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:3},
      {name:"Pumpkin Spice", description:"Bring this iconic spice blend to your home year-round", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:3},
      {name:"Apple Crisp", description:"Straight out of the oven!", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: false,scent_nameId:3},
      {name:"Sandlewood", description:"A warm and cozy vibe that is perfect for a late evening", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:5},
      {name:"Cedar Forest", description:"Like a nice stroll through the forest.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:5},
      {name:"Spring Garden", description:"Fresh scents of all of your favorite flowers", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:1},
      {name:"Pineapple Peach Tea", description:"Perfect for a hot summer day.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:2},
      {name:"Citrus Spritz", description:"As refreshing as it sounds.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:2},
      {name:"Gingerbread", description:"A classic on a winter morning.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: false, scent_nameId:3},
      {name:"Birthday Cake", description:"A special sweet treat.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:3},
      {name:"Summer Sunset", description:"The colors speak for itself. Just like our scent.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:4},
      {name:"Firecrackers", description:"A 4th of July best seller.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true, scent_nameId:3},
      {name:"Vanilla Bean", description:"Our sweet spin on this sugary scent", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:2},
      {name:"Cherry Blossum", description:"Tart cherry with a delicate floral essence", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:1},
      {name:"Grapefruit Ginger", description:"Fresh with a spicy ginger kick!", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: false,scent_nameId:2},
      {name:"Lemongrass", description:"A fresh clean scent!", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU", inStock: true,scent_nameId:4},
      {name:"Fresh Rainfall", description:"Put it on, curl up in a warm blanket, and read a good book.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:5},
      {name:"Wildflower", description:"Adds a fresh and natural fragrence to any room.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:1},
      {name:"Lilac", description:"Soft and energizing for a spring day.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: true, scent_nameId:1},
      {name:"Mahogany Teakwood", description:"Like grabbing a flannel for a hike in the woods.", price:16.99, imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFOfDMYpikis7ZxtYDmbc9uRdE4vONOJ23Q&usqp=CAU",inStock: false, scent_nameId:5},
//flowers, fruity/food, seasonal, fresh, earthy/woody
    ];

    const candles = await Promise.all(candlesToCreate.map(createCandle));
    console.log("Candle created:", candles);
    console.log("Finished creating candles!");

  } catch(error){
    console.error("Error creating candles");
    throw error;
  }
}


async function populateInitialUser_Reviews() {
  try{
    console.log("Starting to create review...");

    const user_reviewsToCreate = [
      {name:"This smells great!", description:"Would buy again!", candleReviewedId:1, userReviewingId:1},
      {name:"npm fart?? What is that", description:"But low key smells great.", candleReviewedId:5, userReviewingId:1},
      {name:"Pumpkin Spice bleh", description:"Smells nothing like Starbucks pumpkin spice late.", candleReviewedId:13, userReviewingId:3},
      {name:"Perfect Gift for Mother's Day", description:"My mother loves the smell of lilacs.", candleReviewedId:29, userReviewingId:4},
      {name:"Fresh Cut Roses", description:"Average at best.", candleReviewedId:8, userReviewingId:2}
    ];

    const userReviews = await Promise.all(user_reviewsToCreate.map(createReview));
    console.log("Reviews created:", userReviews);
    console.log("Finished creating reviews!");
  } catch(error){
    console.log("Error creating reviews");
    throw error
  }
}

async function populateInitialOrders() {
  try{  
    console.log("starting to create orders...");

    const ordersToCreate = [
      {status: 'created', userId: 1},
      {status: 'created', userId: 2},
      {status: "created", userId: 3},
      {status: "created", userId: 4},
    ];
   

    const orders = await Promise.all(ordersToCreate.map(createOrder))
    console.log("Orders Created:", orders);
    console.log("Finished creating orders!");
      
  } catch(error) {
    console.log("Error creating orders");
    throw error
  }
}

async function populateInitialOrderProducts() {
  try{
    console.log("Starting to create orderProducts...");

    const orderProductsToCreate =[
      {productId:1, orderId:1, price:16.99, quantity:2},
      {productId:3, orderId:1, price:16.99, quantity:1},
      {productId:22, orderId:1, price:16.99, quantity:3},
      {productId:8, orderId:2, price:16.99, quantity:1},
      {productId:30, orderId:2, price:16.99, quantity:2},
      {productId:28, orderId:3, price:16.99, quantity:3},
      {productId:18, orderId:3, price:16.99, quantity:2},
      {productId:10, orderId:4, price:16.99, quantity:2},
      {productId: 13, orderId:4, price:16.99, quantity:1},
      {productId:25, orderId:4, price:16.99, quantity:3}
    ];

    const orderProducts = await Promise.all(orderProductsToCreate.map((addProductToOrder)));
    console.log("OrderProducts created", orderProducts);
    console.log("Finished creating order_Products...");

  } catch(error){
    console.log("Error creating OrderProducts")
    throw error
  }
}

async function populateInitialUser_Cart() {
  try{
    const user_cart = [
      {}
      //userId, candlesAddedId, quantity
    ]
  } catch(error){
    throw error
  }
}

async function rebuildDB() {
  try{
    await buildTables();
    await populateInitialUsers();
    await populateInitialScent_Names();
    await populateInitialCandles();
    await populateInitialUser_Reviews();
    await populateInitialOrders();
    await populateInitialOrderProducts();
  } catch(error){
    throw error;
  }
}

rebuildDB().catch(console.error).finally(()=>client.end());
