import {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist
} from './helpers/inquirer.js';

const main = async() => {
    let opt = 0;
    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1: //Escribir ciudad
                const lugar = await leerInput('Ciudad: ');
                console.log(lugar);
                
                //Buscar los lugares
                //Seleccionar el lugar
                //Clima
                //Mostrar resultados
                console.log(`\nInformacion de la ciudad\n`.brightMagenta);
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