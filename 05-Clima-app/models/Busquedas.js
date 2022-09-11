import fs from 'fs';
import axios from 'axios';

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor(){
        //leer DB si existe
        this.leerdb();

    }

    get historialCapitalizado() {
        
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
        
        
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
   
    async ciudad ( lugar = '') {
        try {
        
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox                                   
            });
        
            //petición http
            const resp = await instancia.get();
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));        
        }
        catch(error){
            console.log(error);
        }        
    }

    async climaLugar( lat, lon ) {

        try{
            
            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'appid': process.env.OPENWEATHER_KEY,
                    'lat': lat,
                    'lon': lon,
                    'units': 'metric',
                    'lang': 'es'
                }                                 
            });

            //const resp = await instancia.get();
            //console.log(resp.data);

            //resp.data
            const resp = await instancia.get();           

            /*const minima = resp.data.main.temp_min;
            const maxima = resp.data.main.temp_max;
            const temperatura = resp.data.main.temp;

            return resp.data.weather.map( clima => ({
                desc: clima.description,
                min: minima,
                max: maxima,
                temp: temperatura
            })); */

            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
            

        }catch(error){
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ) {
        
        if(this.historial.includes(lugar.toLocaleLowerCase()))
        {
            return;
        }
        
        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.guardardb();
    }

    guardardb(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(payload));

    }

    leerdb(){

        //debe de existir...
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding : 'utf-8'});

        const data = JSON.parse(info);        
        
        this.historial = data.historial;
    }


}

export default Busquedas;