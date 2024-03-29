import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${ '1'.green }. Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2'.green }. Historial`
            },
            {
                value: 0,
                name: `${'0'.green }. Salir`
            },
           
        ]
    }
];

const preguntaPausa = [{
    type: 'input',
    name: 'enter',
    message: `\nPresione ${ 'ENTER'.green} para continuar\n`
}       
];

const inquirerMenu = async () => {
    console.clear();
    console.log('====================='.green);
    console.log('Seleccione una opción'.white);
    console.log('=====================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
};

const pausa = async (opt) => {
    
    //console.log(opt);
    console.log('\n');
    const { opcion } = await inquirer.prompt(preguntaPausa);

    return opcion;
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listarLugares = async ( lugares = []) => {
    
    const choices = lugares.map( (lugar, i) => {
        
        const idx = `${ i + 1}.`.green;

        return {
            value: lugar.id,
            name: `${idx} ${ lugar.nombre}`
        }
    });

    choices.unshift(
        {
            value: '0',
            name: '0.'.green + ' Cancelar'
        }
    );
        
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione',
            choices
        }
    ];

    const { id } = await inquirer.prompt(question);
    return id;

}

const listadoCheck = async ( tareas = []) => {
    const choices = tareas.map( (tarea, i) => {
        const idx = `${ i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${ tarea.desc}`,
            checked: tarea.completadoEn ? true : false
        }
    });
        
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);
    return ids;

}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    listadoCheck
}