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
                const placeSel = places.find(l => l.id === id);
                
                //Clima
                //Mostrar resultados
                console.log(`\nInformacion de la ciudad\n`.cyan);
                console.log(`Ciudad:`, placeSel.nombre);
                console.log(`Lat:`, placeSel.lat);
                console.log(`Lng:`, placeSel.lng);
                console.log(`Temperatura:`, );
                console.log(`Minima:`, );
                console.log(`Maxima:`, );
                
                
                
            break;
            case 2: //Historial
                //Mostrar hasta 5 resultados recientes que haya hecho el usuario
            break;
        }
        
        if(opt !== 0) await pausa();

    }while(opt !== 0);
    
}

main();