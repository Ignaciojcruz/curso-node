require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoBorrar,
        confirmar,
        listadoCheck } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

console.clear();

const main = async() => {
   
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if(tareasDB){
        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
        
    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;
            
            case '2':
                tareas.listadoCompleto();
            break;

            case '3':
                tareas.listarPendientesCompletadas();
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await listadoCheck(tareas.listadoArr);
                tareas.toggleTareas(ids);
            break;

            case '6':
                const id = await listadoBorrar( tareas.listadoArr );
                if(id === '0') break;
                const ok = await confirmar('¿Está seguro de borrar?');
                tareas.borrarTarea(id);
                console.log('Tarea borrada');
            break;
            
        }
      
        guardarDB(tareas.listadoArr);
        
        await pausa();
        
    }while(opt !== '0');
    
    
}

main();