require('colors');
const { inquirerMen } = require('./helpers/inquirer');



console.clear();

const main = async () => {

    console.log('Hola Mundo');

    let opt = '';

    do {

        opt = await inquirerMen(); 

        console.log({ opt });
       
    } while (opt !== '0');
    

    //
};

main();