const express = require('express');
const usersRouter = express.Router();
const {getAllUsers, getUserByUsername, getUserById, getUser} = require("../db/models/user")

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
    const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password"
    });
  };

  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    console.log(hashedPassword)
    console.log(password)


    bcrypt.compare(password, hashedPassword, function (err, passwordsMatch) {
      if (passwordsMatch) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
        res.send({ message: "you're logged in!", token: `${token}` });
        
        return token;
      } else throw new Error({name: 'IncorrectCredentialsError',
            message: 'Username or password is incorrect'});
});
} catch (error) {
console.log(error);
next(error);
}
});

//POST api/user/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password} = req.body;
  const SALT_COUNT = 10;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
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

    bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
      const user = await createUser({
        username,
        password: hashedPassword
      });

      const token = jwt.sign({
        id: user.id,
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });

      res.send({
        user,
        message: "thank you for signing up",
        token
      });
    });
  } catch ({ name, message }) {
    next({ name, message })
  }
})

//GET api/user/me
usesrRouter.get('/me', async (req, res) => {
    
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


module.exports = usersRouter