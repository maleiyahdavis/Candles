// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");
const SALT = 10; 

async function createUser({firstName, lastName, email, username, password}) {
  try{
    const hashedPassword = await bcrypt.hash(password, SALT);
    const {rows:[user]} = await client.query(`
        INSERT INTO users("firstName", "lastName", email, username, password)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
        [firstName, lastName, email, username, hashedPassword]);
        
        return user;
  } catch(error){
    console.error("Error creating user");
    throw error
  }
}
async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    //console.log("LOOOOK", user)
    if (!user) {
      return;
    }
    const hashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return;
    }
    delete user.password;
    //console.log("LOOK", user)
    return user;
    } catch (error) {
    console.error(error);
  }

}

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

async function getUserById(id) {
  try{
    const {rows:[user]} = await client.query(`
      SELECT *
      FROM USERS
      WHERE id=${id};
    `);
    delete user.password;
    console.log("getUserById?", "id:", id, user)
    return user;
  } catch(error){
    throw error
  }
}
async function getUserByUsername(username) {
  //console.log("username", username);
  try{
    const {rows:[user]} = await client.query(`
      SELECT *
      FROM users
      WHERE username=$1;
    `,[username])

    //console.log("getUserByUsername?", "username", username, user)
    return user;
  } catch(error){
    throw error
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser, 
  getUserById, 
  getUserByUsername, 
  getUser
};
