import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from 'express'

import {
    inquirerMenu, pausa, leerInput
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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
                
                //Buscar los lugares
                //Seleccionar el lugar
                //Clima
                //Mostrar resultados
                console.log(`\nInformacion de la ciudad\n`.cyan);
                console.log(`Ciudad:`, );
                console.log(`Lat:`, );
                console.log(`Lng:`, );
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