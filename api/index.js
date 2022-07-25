const express = require('express')
const apiRouter = express.Router();
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET = "neverTell"} = process.env;

app.use(cors());

apiRouter.use(async (req, res, next) => {
  //console.log("made it to apiRouter")
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if(!auth) {
      next();
  }else if (auth.startsWith(prefix)){
      const token = auth.slice(prefix.length);
      
      try {
          const { id } = jwt.verify(token, JWT_SECRET, {ignoreExpiration: true})
          
          if(id){
              req.user = await getUserById(id)
              next();
          }else {
              next({
                name: 'AuthorizationHeaderError',
                message: 'Authorization token malformed',
              });
            }
      } catch ({name, message}) {
         
          next({name, message})
      }
  } else {
      next({
          name: 'AuthorizationHeaderError',
           message: `Authorization token must start with ${prefix}`
          });
  }
});

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});


//ROUTER /api/user
const usersRouter = require('./user');
apiRouter.use('/user', usersRouter);

//ROUTER /api/scents
const scentsRouter = require('./scent_names');
apiRouter.use('/scent_names', scentsRouter);

//ROUTER /api/candles
const candlesRouter = require('./candles');
apiRouter.use('/candles', candlesRouter);

//ROUTER /api/reviews
const reviewsRouter = require('./reviews');
apiRouter.use('/reviews', reviewsRouter);

//ROUTER /api/orders
const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter)

module.exports = apiRouter;
