const express = require('express');
const getPeople = require('./people');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.get('/talker', async (_req, res) => {
const result = await getPeople();
res.status(200).json(result);
});

app.listen(PORT, () => {
  console.log('Online');
});
