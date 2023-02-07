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
const writePeople = async (content) => {
    try {
    await fs.writeFile(completePath, JSON.stringify(content, null, 2, 'utf-8'));
    } catch (e) {
        console.error(e.message);
    }
}; 
        const createPeople = async (name, age, talk) => {
                const data = await readPeople();
                const newPerson = {
                    name,
                    age,
                    id: data.length + 1,
                    talk: {
                      watchedAt: talk.watchedAt,
                      rate: talk.rate,
                    },
                  };
                  data.push(newPerson);
                //   console.log(newPerson);
                //   data.id += 1;
                  await writePeople(data);
                  return newPerson;
                };

module.exports = { getPeople, findPeople, createPeople };