const empleados = [
    {
        id : 1,
        nombre : 'Fernando'
    },
    {
        id : 2,
        nombre : 'Linda'
    },
    {
        id : 3,
        nombre : 'Luis'
    }
];

const salarios = [
    {
        id : 1,
        salario : 1000
    },
    {
        id : 2,
        salario : 1500
    },
];


const getEmpleado = ( id ) => {
    
    return new Promise(( resolve, reject) => {

        const empleado = empleados.find( e => e.id === id);

        (empleado)
            ? resolve(empleado.nombre)
            : reject(`No existe el empleado con id ${ id }`);

    })
         
}

const getSalario = (id) => {

    return new Promise((resolve, reject) => {
        
        const salario = salarios.find(s => s.id === id);

        (salario)
            ? resolve(salario.salario)
            : reject(`No existe salario para id ${ id }`);
    })
}

const id = 2;
/*getEmpleado(id)
    .then(empleado => console.log( empleado))
    .catch(err => console.log(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));*/

/*getEmpleado(id)
    .then( empleado => {
        getSalario(id)
            .then(salario => {
                console.log(`El salario del empleado ${empleado} es de: ${ salario}`);
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
*/

let nombre;
getEmpleado(id)
    .then( empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then(salario => console.log('El salario del empleado ', nombre, 'es de: ', salario))
    .catch(err => console.log(err));



