const inquirer = require('inquire');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: ['opt1','opt2','opt3']
    }
];

const inquirerMen = async() => {
    process.stdout.write('\033c');   
    console.log('====================='.green);
    console.log('Seleccione una opción'.green);
    console.log('=====================\n'.green);

    const opt = await inquirer.prompt(preguntas);

    return opt;
}

module.exports = {
    inquirerMen
}