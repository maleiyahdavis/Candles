const express = require('express');
const usersRouter = express.Router();
const {getAllUsers, getUserByUsername, getUserById, createUser, getUser} = require("../db/models/user");
const {getOrdersByUser} = require("../db/models/orders")
const bcrypt = require('../node_modules/bcrypt');
const jwt = require('jsonwebtoken'); 
const {JWT_SECRET = 'secret'} = process.env;


//GET api/user/
usersRouter.get('/', async (req, res) => {
    try{
        const users = await getAllUsers();
        res.send(users)
    } catch(error) {
        console.error(error)
    }
})

//POST api/user/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body.user;
    //console.log(req)
    console.log(req.body)
    console.log("username", username, "password", password)


  if (!username || !password) {
    res.send({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  };

  try {
    const user = await getUser(username, password);
    console.log("user:", user)
    const hashedPassword = user.password;

    //console.log(hashedPassword)
    //console.log(password)

    const passwordsMatch =  await bcrypt.compare(password,hashedPassword)
    if(user && passwordsMatch) {
            
      const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET,  {expiresIn: '1w'})
      
      res.send({ 
          user: {
              id: user.id,
              username: user.username
          },
          message: "you're logged in!",
          token
      });
    }else {
        
        next({
            name: "IncorrectCredentialsError",
            message: "Username or password is incorrect",
        });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
  });

//POST api/user/register
usersRouter.post('/register', async (req, res, next) => {
  
  const { firstName, lastName, username, password, email} = req.body.user;
  
  const SALT_COUNT = 10;

  try {
    const _user = await getUserByUsername(username);
    //console.log("user:",_user); 
    if (_user) {
      res.send({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    };

    if (password.length < 8) {
      next({
        name: 'PasswordTooShort',
        message: 'Password must be at least 8 characters'
      })
    };

    //bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
      const user = await createUser({
        username,
        password,
        lastName,
        firstName,
        email
      });
      //console.log("user", user);
      const token = jwt.sign({
        id: user.id,
        username
      }, JWT_SECRET, {
        expiresIn: '1w'
      });
     // console.log("token", token);
      
     res.send({
      message: 'thank you for sigining up',
      token,
      user
    })
    
  } catch ({ name, message }) {
    next({ name, message })
  }
})

//GET api/user/me
usersRouter.get('/me', async (req, res) => {
    
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  try {
      if (!auth) {
          res.status(401).send({
              message:"You must be logged in to perform this action",
              name:"error",
              error:"error"
          })
      } else if (auth.startsWith(prefix)) {
          const token = auth.slice(prefix.length);
          const { id } = jwt.verify(token, process.env.JWT_SECRET);
        
         req.user = await getUserById(id);

         res.send(req.user)
      } 
  } catch (error) {
      console.error(error)
  }

});

//GET api/user/:userId/orders
usersRouter.get('/:userId/orders', async (req, res) => {
  const {userId} = req.params;
  try{
      const userOrders = await getOrdersByUser(userId);
      res.send(userOrders);
  } catch(error) {
      console.error(error)
  }

});


module.exports = usersRouter