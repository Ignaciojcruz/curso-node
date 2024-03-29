import 'dotenv/config';
import { leerInput,
         inquirerMenu,
         pausa,
         listarLugares } from './helpers/inquirer.js';
import  Busquedas  from './models/Busquedas.js';


const main = async () => {

    let opt = -1;
    const busquedas = new Busquedas();
    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ingrese ciudad: ');
                                
                //buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                
                //seleccionar el lugar
                const id = await listarLugares(lugares);
                if(id === '0') continue;
                
                const lugarSel = lugares.find(l => l.id === id);

                //guardar en db
                busquedas.agregarHistorial(lugarSel.nombre);
                
                //clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                
                //mostrar resultados
                console.log('\nInformación de la ciudad\n');
                console.log('Ciudad: ' + lugarSel.nombre.green);
                console.log('Lat: ' + lugarSel.lat);
                console.log('Lng: ' + lugarSel.lng);
                console.log('Temperatura: ' + clima.temp);
                console.log('Mínima: ' + clima.min);
                console.log('Máxima: ' + clima.max);
                console.log('Estado clima: ' + clima.desc.green);
            break;
            
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                //busquedas.historial.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${idx} ${ lugar }`);
                })


            break;
                                 
        }
                     
        if (opt !== 0) await pausa();
        
    }while(opt !== 0);
}

main();