import {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist
} from './helpers/inquirer.js';

const main = async() => {
    const texto = await leerInput('Buenas: ');
    console.log(texto);
    
}

main();