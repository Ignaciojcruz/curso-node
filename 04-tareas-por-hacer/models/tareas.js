const Tarea = require("./tarea");
require('colors');

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea( id ){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto(){
        
        const completada = 'Completada'.green;
        const pendiente = 'Pendiente'.red;
        var estado;
        this.listadoArr.forEach((tarea, i) => {

            estado = pendiente;
            if(tarea.completadoEn) estado = completada;

            console.log(` ${ (i + 1).toString().green } ${ tarea.desc } :: ${ estado } ` )
            
        })
    }

    listarPendientesCompletadas( completadas = true) {
        
        const completada = 'Completada'.green;
        const pendiente = 'Pendiente'.red;
        var estado;
        let i = 0;
        estado = pendiente;
        if(completadas) estado = completada;

        this.listadoArr.forEach(tarea => {

            if(completadas)
            {                
                if(tarea.completadoEn ) 
                {
                    i += 1;
                    console.log(` ${ i.toString().green + '.'.green } ${ tarea.desc } :: ${ tarea.completadoEn.green } ` )
                }
            }
            else{                
                if(!tarea.completadoEn ){
                    i += 1;    
                    console.log(` ${ i.toString().green + '.'.green } ${ tarea.desc } :: ${ estado } ` )
                } 
            }
                                   
        })
    };

    toggleTareas( ids = [] ) {
        ids.forEach( id => {
            
            const tarea = this._listado[id];
            if(!tarea.completadoEn) tarea.completadoEn = new Date().toISOString();

        });

        this.listadoArr.forEach( tarea => {
            
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

        
    }
};



module.exports = Tareas;