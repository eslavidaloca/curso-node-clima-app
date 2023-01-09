import fs from 'fs';

import axios from 'axios';
import colors from 'colors';

export class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es,en',
            'limit': 5
        }
    }

    get historialCapitalizado(){
        return this.historial.map(lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }

    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                timeout: 2000,
                params: this.paramsMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lon: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch(error) {
            return [];
        }
    }
    
    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    async climaLugar(lat, lon){
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                timeout: 2000,
                params: {...this.paramsOpenWeather, lat, lon} //desestructuracion
            });
            const resp = await instance.get();
            const {weather, main} = resp.data; //desestructuracion
            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max
            }
        } catch (err) {
            console.log(err);
        }
    }

    agregarHistorial(lugar = ''){

        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        this.historial = this.historial.splice(0, 4);

        this.historial.unshift(lugar.toLowerCase());
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return null;
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}