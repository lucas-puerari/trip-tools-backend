import express from 'express';

const router = express.Router();

router.get('/', async (request, response) => {
  const { mongoose } = request;

  const dbStatus = mongoose.STATES[mongoose.connection.readyState];

  response.send({
    serverStatus: `running`,
    dbStatus: dbStatus,
  });
});

export default router;
