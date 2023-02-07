const crypto = require('crypto');

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

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
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
    next();
};

module.exports = { generateToken, validaEmail, validaPassword };
