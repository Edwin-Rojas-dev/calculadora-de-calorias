document.getElementById('formulario-calculadora').addEventListener('submit', function (event) {
    event.preventDefault();
    verifyDataNotNull();
});

document.getElementById('clean-message').addEventListener('click', function (event) {
    event.preventDefault();
    limpiarMensaje();
});

const resultado = document.querySelector('#resultado');
const divError = document.createElement('div');

const getValueFrontend = () => {
    let listValues = {
        'nombre': document.getElementById('nombre').value,
        'tipoDocumento': document.getElementById('tipo_documento').value,
        'numeroDocumento': document.getElementById('numero_documento').value,
        'edad': parseInt(document.getElementById('edad').value),
        'peso': parseFloat(document.getElementById('peso').value),
        'altura': parseFloat(document.getElementById('altura').value),
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
        if (isNaN(getValueFrontend().peso) || getValueFrontend().peso <= 50 || getValueFrontend().peso > 110) {
            showMessageError('Por favor ingrese un peso válido (entre 50 y 110 kg).');
            return;
        }
        
        if (getValueFrontend().numeroDocumento.length !== 8 && getValueFrontend().numeroDocumento.length !== 10) {
            showMessageError('Por favor ingrese un número de documento válido de 8  o 10 caracteres).');
            return;
        }
        
        if(getValueFrontend().altura < 140 || getValueFrontend().altura > 250){
            showMessageError('Por favor ingrese su altura correcta en cm.');
            return;
        }
        calculateCalories();
    }
          
    

    
}


const calculateCalories = () => {
    
    //Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
    //Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
    let peso = getValueFrontend().peso;
    let altura = getValueFrontend().altura;
    let edad = getValueFrontend().edad;
    let genero = getValueFrontend().genero;
    let tmb;
    genero === 'M' ?
    tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5 :
    tmb = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;

    // // Calcular calorías totales según actividad física
    // tmb: tasa de metabolismo basal
    const caloriasTotales = tmb * getValueFrontend().actividadFisica;
    let grupoPoblacional = definePopulationGroup();

    // Mostrar mensaje con la información
    innerResponse(
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
    
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        hideResultCss();
    }, 5000);
}


// Animaciones

const innerResponse = (nombre, tipoDocumento, numeroDocumento, caloriasTotales, grupoPoblacional) =>{
    resultado.innerHTML = `
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            
            <p> El paciente: ${nombre} identificado con ${tipoDocumento} No.${numeroDocumento}, requiere un total de ${caloriasTotales.toFixed(0)} kcal para el sostenimiento de su TBM. Perteneciente al grupo poblacional: <strong>${grupoPoblacional} </strong> </p>

        </div>
    `;
}

const showResultCss = () => { 
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

const hideMsjErrorCss = () => {
    let distancia = 1;
    let id = setInterval(() => {
        distancia *= 2;
        if (distancia > 100) {
            clearInterval(id);
            divError.style.display = 'none';
            divError.style.top = 0;
        }
    }, 10)
}