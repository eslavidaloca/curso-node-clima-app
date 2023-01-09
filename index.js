import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'

import {
    inquirerMenu, pausa, leerInput, listarLugares
} from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

dotenv.config();

const main = async() => {
    let opt = 0;
    const busquedas = new Busquedas();
    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1: //Escribir ciudad
                const placeSearched = await leerInput('Ciudad: ');
                const places = await busquedas.ciudad(placeSearched);
                const id = await listarLugares(places);

                if (id === '0') continue; //Opcion cancelar

                const placeSel = places.find(l => l.id === id);
                busquedas.agregarHistorial(placeSel.nombre);
                const weather = await busquedas.climaLugar(placeSel.lat, placeSel.lon);

                console.clear();
                console.log(`\nInformacion de la ciudad\n`.cyan);
                console.log(`Ciudad:`, placeSel.nombre);
                console.log(`Lat:`, placeSel.lat);
                console.log(`Lng:`, placeSel.lon);
                console.log(`Temperatura:`, weather.temp);
                console.log(`Minima:`, weather.temp_min);
                console.log(`Maxima:`, weather.temp_max);
                console.log(`Estado del clima:`, weather.desc);
                
            break;
            case 2: //Historial
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                const idx = `${i + 1}.`.green;
                console.log(`${idx} ${lugar}`);
                })
            break;
        }
        
        if(opt !== 0) await pausa();

    }while(opt !== 0);
    console.clear();
}

main();