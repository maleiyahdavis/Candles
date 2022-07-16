const express = require('express')
const apiRouter = express.Router();
const cors = require('cors');
const app = express();

app.use(cors());

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


//ROUTER /api/users
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

module.exports = apiRouter;
