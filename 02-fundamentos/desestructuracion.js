const Deadpool = {
    nombre :'Wade',
    apellido : 'Winston',
    poder : 'Regeneración',
    getNombre(){
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }
}

//const { nombre, apellido, poder } = Deadpool;
//console.log(nombre, apellido, poder);

function imprimeHeroe( {nombre, apellido, poder})
{
    nombre = 'Fernando';
    console.log(nombre, apellido, poder);
}

//imprimeHeroe(Deadpool);

const heroes = ['Deadpool','Superman','Batman'];

const [,,h3] = heroes;

console.log(h3);



