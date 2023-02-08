const express = require('express');
const people = require('./people');
const { generateToken, validaEmail,
   validaPassword,
    validaToken, 
    validaAge,
     validaName, // VALIDAÇÕES
     validaTalkAndWatched,
     rateValidation,
     validateWatchedAt,
     isInt,
     } = require('./validations');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
const result = await people.getPeople();
res.status(200).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await people.findPeople(id);
  if (!result) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(result);
});

app.post('/login', 
 validaEmail,
 validaPassword,
  async (_req, res) => {
  const myToken = generateToken(16);
  return res.status(HTTP_OK_STATUS).send({ token: myToken });
});

  app.post('/talker', 
  validaToken,
  validaAge,
  validaName,
  validaTalkAndWatched,
  rateValidation,
  validateWatchedAt,
  isInt,
 async (req, res) => {
  const { name, age, talk } = req.body;
  const newPerson = await people.createPeople(name, age, talk);
  return res.status(201).send(newPerson);
});
app.put('/talker/:id', 
validaToken,
validaAge,
validaName,
validaTalkAndWatched,
rateValidation,
validateWatchedAt,
isInt,
async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updatedPerson = await people.updatedPerson(id, name, age, talk);
  return res.status(200).send(updatedPerson);
});

app.listen(PORT, () => {
  console.log('Online');
});
