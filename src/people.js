const fs = require('fs').promises;

const { join } = require('path');

const path = ('./talker.json');

const completePath = join(__dirname, path);

const readPeople = async () => {
    try {
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
const findPeople = async (id) => {
    const people = await readPeople();
    const peoplefinded = people.find((pessoa) => pessoa.id === Number(id));
    return peoplefinded;
};
    // try {
    //     const writePeople = async (people) => {
    //     const contentWrileFile = await fs.writeFile(completePath, 'utf-8');
    // };
    // } catch (e) {
    //     console.error('Erro na escrita do arquivo', e.message);
    // }
module.exports = { getPeople, findPeople };