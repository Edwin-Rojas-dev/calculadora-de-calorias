document.getElementById('formulario-calculadora').addEventListener('submit', function (event) {
    event.preventDefault();
    calcularCalorias();
});


function calcularCalorias() {


    const nombre = document.getElementById('nombre').value;
    const tipoDocumento = document.getElementById('tipo_documento').value;
    const numeroDocumento = parseInt(document.getElementById('numero_documento').value);
    const edad = parseInt(document.getElementById('edad').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const actividadFisica = parseFloat(document.getElementById('actividad').value);
    const genero = document.querySelector('input[name="genero"]:checked').value;

    //Verificar que se ingresen todos los datos
    //  if (!nombre || !tipoDocumento || !numeroDocumento || isNaN(edad) || isNaN(peso) || isNaN(altura) || isNaN(actividadFisica) || !genero) {
    //     mostrarMensajeDeError('Por favor complete todos los campos.');
    //     return;
    //  }

    // Validate weight within a reasonable range 
if (isNaN(peso) || peso <= 3 || peso > 110) {
    mostrarMensajeDeError('Por favor ingrese un peso válido (entre 0 y 1000 kg).');
    return;
}

// Validate document length
if (numeroDocumento.length === 8 || numeroDocumento.length === 10) {
    mostrarMensajeDeError('Por favor ingrese un número de documento válido (entre 7 y 10 caracteres).');
    return;
}

//validate height
if(altura < 40 || altura > 250){
    mostrarMensajeDeError('Por favor ingrese su altura correcta en cm.');
}

// Validate if a string is a real number
if (!/^\d*\.?\d+$/.test(edad)) {
    mostrarMensajeDeError('Por favor ingrese una edad válida (número real).');
    return;
}

// Ensure other fields are not empty
if (!nombre || !tipoDocumento || !genero) {
    mostrarMensajeDeError('Por favor complete todos los campos.');
    return;
}


    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5

    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    let tmb;
    if (genero === 'M') {
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    } else {
        tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
    }

    // Calcular calorías totales según actividad física
    // tmb: tasa de metabolismo basal
    const caloriasTotales = tmb * actividadFisica;



    let grupoPoblacional;
    if (edad >= 15 && edad <= 29) {
        grupoPoblacional = 'Joven';
    } else if (edad >= 30 && edad <= 59) {
        
        grupoPoblacional = 'Adulto';
    } else {
        grupoPoblacional = 'Adulto Mayor';
    }
    console.log(grupoPoblacional)



    // Mostrar mensaje con la información
    const resultado = document.querySelector('#resultado');
    console.log(resultado)
    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
           <img src="./img/calories.jpg" alt="logo" style="width:220px; border-radius: 8px;" >

            <h5 class="card-title h2">Calorías requeridas</h5>
            
            <p> El paciente: ${nombre} identificado con ${tipoDocumento} No.${numeroDocumento}, requiere un total de ${caloriasTotales.toFixed(0)} kcal para el sostenimiento de su TBM. Perteneciente al grupo poblacional: <strong>${grupoPoblacional} </strong> </p>

        </div>
    `;

   

}


// /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////s

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}