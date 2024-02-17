import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import winston from 'winston';
import books from './books';

const app = express();
const port = 3000;

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/books', (req, res) => {
  try {
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  logger.debug(`Example app listening on port ${port}`);
});

export default app;
