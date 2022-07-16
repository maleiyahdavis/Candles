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

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping tables...");
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS candles;
      DROP TABLE IF EXISTS scent_name;
      DROP TABLE IF EXISTS users;
    `)
    console.log("Finished dropping tables...")
    // drop tables in correct order

    console.log("Creating tables...")
    //does cart need an isPublic component?
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );`);
      console.log("1")
      await client.query(`
        CREATE TABLE scent_name (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL);
      `);
      console.log("2")
      await client.query(`
      CREATE TABLE candles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price TEXT NOT NULL,
        "scent_nameId" INTEGER REFERENCES scent_name(id) NOT NULL
      );`);
      console.log("3")
      await client.query(`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        description TEXT NOT NULL,
        "candleReviewedId" INTEGER REFERENCES candles(id) NOT NULL,
        "userReviewingId" INTEGER REFERENCES users(id) NOT NULL
      );`);
      console.log("4")
      await client.query(`
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "candlesAddedId" INTEGER REFERENCES candles(id),
        "userId" INTEGER REFERENCES users(id),
        quantity INTEGER
      );`)
    
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
      {username: "Jeremy", password: "jeremy89"}, //1
      {username: "Maleiyah", password: "maxwell"}, //2
      {username: "Anna", password: "annabanana22"}, //3
      {username: "Kiara", password: "Bates100"} //4
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
      {name:"Dark Mode", description:"", price:"", scent_nameId:5}, //should scentname be a string or integer?
      {name: "BooleanBerry", description:"", price:"", scent_nameId:2},
      {name: "Byte sized Cookies", description:"", price:"", scent_nameId:2},
      {name: "Cup of Java", description:"", price:"", scent_nameId:2},
      {name: "npm fart", description:"", price:"", scent_nameId:5},
      {name: "Debugger Daisies", description:"", price:"", scent_nameId:1},
      {name: "Error 404", description:"", price:"", scent_nameId: 5},
      {name:"Roses", description:"", price:"", scent_nameId:1},
      {name:"Costal Breeze", description:"", price:"", scent_nameId:4},
      {name:"Euchalyptus", description:"", price:"", scent_nameId:4},
      {name:"Christmas Wreath", description:"", price:"", scent_nameId:3},
      {name:"Pine Cones", description:"", price:"", scent_nameId:3},
      {name:"Pumpkin Spice", description:"", price:"", scent_nameId:3},
      {name:"Apple Crisp", description:"", price:"", scent_nameId:3},
      {name:"Sandlewood", description:"", price:"", scent_nameId:5},
      {name:"Cedar Forest", description:"", price:"", scent_nameId:5},
      {name:"Spring Garden", description:"", price:"", scent_nameId:1},
      {name:"Pineapple", description:"", price:"", scent_nameId:2},
      {name:"Citrus Spritz", description:"", price:"", scent_nameId:2},
      {name:"Gingerbread", description:"", price:"", scent_nameId:3},
      {name:"Birthday Cake", description:"", price:"", scent_nameId:3},
      {name:"Summer's Breeze", description:"", price:"", scent_nameId:4},
      {name:"Firecrackers", description:"", price:"", scent_nameId:3},
      {name:"Vanilla Bean", description:"", price:"", scent_nameId:2},
      {name:"Cherry Blossum", description:"", price:"", scent_nameId:1},
      {name:"Peach Tea", description:"", price:"", scent_nameId:2},
      {name:"Lemongrass", description:"", price:"", scent_nameId:4},
      {name:"Fresh Rainfall", description:"", price:"", scent_nameId:5},
      {name:"Wildflower", description:"", price:"", scent_nameId:1},
      {name:"Lilac", description:"", price:"", scent_nameId:1},
      {name:"Mahogany Teakwood", description:"", price:"", scent_nameId:5},
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

// buildTables()
//   .then(populateInitialData)
//   .catch(console.error)
//   .finally(() => client.end());

async function rebuildDB() {
  try{
    await buildTables();
    await populateInitialUsers();
    await populateInitialScent_Names();
    await populateInitialCandles();
    await populateInitialUser_Reviews();
  } catch(error){
    throw error;
  }
}

rebuildDB().catch(console.error).finally(()=>client.end());
