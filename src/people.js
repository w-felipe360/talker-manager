const fs = require('fs').promises;

const { join } = require('path');

const path = ('./talker.json');

const readPeople = async () => {
    try {
        const completePath = join(__dirname, path);
        const contentFile = await fs.readFile(completePath, 'utf-8');
        return JSON.parse(contentFile);
    } catch (e) {
        console.error('Erro na leitura do arquivo', e.message);
        return null;
    }
};

const getPeople = async () => {
    const data = await readPeople();
    return data;
}; 

module.exports = getPeople;