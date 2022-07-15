const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log("Dropping tables...")
    await client.query(`
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS scent_name;
      DROP TABLE IF EXISTS candles;
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
      );
      CREATE TABLE candles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER
      );
      CREATE TABLE scent_name (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        "candleId" INTEGER REFERENCES candles(id) NOT NULL,
      );
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        "candleReviewedId" INTEGER REFERENCES candles(id) NOT NULL,
        "userReviewingId" INTEGER REFERENCES users(id) NOT NULL
      );
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "candlesAddedId" INTEGER REFERENCES candles(id),
        "userId" INTEGER REFERENCES users(id),
        quantity INTEGER
      );
    `)
    console.log("Finished creating tables...")
    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialUsers() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })

    const usersToCreate = [
      {username: "Jeremy", password: "jeremy89"},
      {username: "Maleiyah", password: "maxwell"},
      {username: "Anna", password: "annabanana22"},
      {username: "Kiara", password: "Bates100"}
    ];
  } catch (error) {
    throw error;
  }
}

async function populateInitialCandles() {
  try{

    const candlesToCreate = [
      {name:"Dark Mode", description:"", price:""},
      {name: "BooleanBerry", description:"", price:""},
      {name: "Byte sized Cookies", description:"", price:""},
      {name: "Cup of Java", description:"", price:""},
      {name: "npm fart", description:"", price:""},
      {name: "Debugger Daisies", description:"", price:""},
      {name: ".... 404", description:"", price:""},
      {}
//flowers, fruity, seasonal, fresh, earthy/woody?
    ];
  } catch(error){
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
