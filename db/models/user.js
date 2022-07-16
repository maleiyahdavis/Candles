// grab our db client connection to use with our adapters
const client = require('../client');

async function createUser({username, password}) {
  try{
    const {rows:[user]} = await client.query(`
        INSERT INTO users(username, password)
        VALUES ($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
        [username, password]);

        return user;
  } catch(error){
    console.error("Error creating user");
    throw error
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser
};

async function getAllUsers() {
  try{
    const {rows:user} = await client.query(`
    SELECT *
    FROM USERS
    ;`)

    return user
  } catch(error) {
    throw error
  }
  /* this adapter should fetch a list of users from your db */
}

