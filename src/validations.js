const crypto = require('crypto');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
function generateToken(param) {
    const token = crypto.randomBytes(param / 2).toString('hex');
    return token;
}
const validaEmail = (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).send({
          message: 'O "email" deve ter o formato "email@email.com"',
        });
      }
    next();
};
const validaPassword = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) {
   return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
    next();
};
const validaToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
       return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};
const validaName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
     return res.status(400).json({ message: 'O campo "name" é obrigatório',
    });
}
    if (name.length < 3) {
       return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres',
        
    });
}
next(); 
};
const validaAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
    }
    if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    }
        if (Number(age) < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
        }
        next();
};
const validaTalkAndWatched = (req, res, next) => {
    const { talk } = req.body; 
    if (!talk) {
        return res.status(400).json(({ message: 'O campo "talk" é obrigatório' }));
    }
    next();
};
const validateWatchedAt = (req, res, next) => {
    const { talk } = req.body;
    if (!talk || !talk.watchedAt) {
            return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
        }
        if (!dateRegex.test(talk.watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
        }
        next();
};  
function rateValidation(req, res, next) {
    const { rate } = req.body.talk;
    if (rate < 1) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (rate === 0) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (rate > 5) {
      return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
      }
    if (!rate) {
    return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
    }
   next();
  } 
 function isInt(req, res, next) {
 const { rate } = req.body.talk;
 if (!Number.isInteger(rate)) {
    return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
 }
 next();
 }
 
module.exports = { 
    generateToken, 
    validaEmail,
    validaPassword,
    validaToken,
    validaName,
    validaAge,
    validaTalkAndWatched,
    validateWatchedAt,
    rateValidation,
    isInt,
};