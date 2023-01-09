import axios from 'axios';
import { pausa } from '../helpers/inquirer.js';

export class Busquedas {
    historial = ['Houston','Grecia','Texas'];

    constructor() {
        //TODO: Leer db si existe
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'language': 'es,en',
            'limit': 5
        }
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
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch(error) {
            return [];
        }
        
        
    }
}