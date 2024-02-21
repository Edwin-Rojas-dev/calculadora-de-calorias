document.getElementById('formulario-calculadora').addEventListener('submit', function (event) {
    event.preventDefault();
    verifyDataNotNull();
});

const resultado = document.querySelector('#resultado');

const getValueFrontend = () => {
    let listValues = {
        'nombre': document.getElementById('nombre').value,
        'tipoDocumento': document.getElementById('tipo_documento').value,
        'numeroDocumento': document.getElementById('numero_documento').value,
        'edad': parseInt(document.getElementById('edad').value),
        'peso': parseFloat(document.getElementById('peso').value),
        'altura': parseFloat(document.getElementById('actividad').value),
        'actividadFisica': parseFloat(document.getElementById('actividad').value),
        'genero': document.querySelector('input[name="genero"]:checked').value
    }  
    return listValues;
}


const verifyDataNotNull = () => {
    if (!getValueFrontend().nombre || 
        !getValueFrontend().tipoDocumento || 
        !getValueFrontend().numeroDocumento || 
        isNaN(getValueFrontend().edad) || 
        isNaN(getValueFrontend().peso) || 
        isNaN(getValueFrontend().altura) || 
        isNaN(getValueFrontend().actividadFisica) || 
        !getValueFrontend().genero) {
        showMessageError('Por favor complete todos los campos.');
    } else{
        calculateCalories();
    }
}

const calculateCalories = () => {
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    let tmb;
    if (getValueFrontend().genero === 'M') {
        tmb = (10 * getValueFrontend().peso) + (6.25 * getValueFrontend().altura) - (5 * getValueFrontend().edad) + 5;
    } else {
        tmb = (10 * getValueFrontend().peso) + (6.25 * getValueFrontend().altura) - (5 * getValueFrontend().edad) - 161;
    }

    // // Calcular calorías totales según actividad física
    // tmb: tasa de metabolismo basal
    console.log(tmb);
    const caloriasTotales = tmb * getValueFrontend().actividadFisica;
    console.log(caloriasTotales);
    let grupoPoblacional = definePopulationGroup();

    // Mostrar mensaje con la información
    showResultCss(
        getValueFrontend().nombre,
        getValueFrontend().tipoDocumento, 
        getValueFrontend().numeroDocumento, 
        caloriasTotales, 
        grupoPoblacional
    );
      
}


const definePopulationGroup = () => {
    let edad = getValueFrontend().edad;
    if (edad >= 15 && edad <= 29) {
        return 'Joven';
    } else if (edad >= 30 && edad <= 59) {  
        return 'Adulto';
    } else {
        return'Adulto Mayor';
    }
}


const showMessageError= (msg) => {
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
        hideResultCss();
    }, 5000);
}


// Animaciones
const showResultCss = (nombre, tipoDocumento, numeroDocumento, caloriasTotales, grupoPoblacional) => {
    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            
            <p> El paciente: ${nombre} identificado con ${tipoDocumento} No.${numeroDocumento}, requiere un total de ${caloriasTotales.toFixed(0)} kcal para el sostenimiento de su TBM. Perteneciente al grupo poblacional: <strong>${grupoPoblacional} </strong> </p>

        </div>
    `;
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

const hideResultCss = () => {
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