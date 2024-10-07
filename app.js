require('dotenv').config();
const express = require('express');
const app = express();
const {PORT, HOST} = process.env;
const postsRouter = require('./routers/postsRouter.js');
const notFoundHandler = require('./middlewares/notFoundHandler.js');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(express.json());

app.get('/', (req, res) => res.send('Home Blog!'));

app.use('/posts', postsRouter);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, HOST, () => console.log(`App listening on http://${HOST}:${PORT}`));
