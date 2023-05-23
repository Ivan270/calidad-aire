let apiUrl = 'https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/';
let formBuscar = document.getElementById('buscarComuna');

formBuscar.addEventListener('submit', (event) => {
	datosComuna.innerHTML = '';
	event.preventDefault();
	getComuna(comunaInput.value);
	formBuscar.reset();
});

const getComuna = async (nombre) => {
	// da formato al input para que quede capitalizado
	let formattedNombre = nombre.replace(/\b\w/g, (l) => l.toUpperCase());

	try {
		let response = await fetch(apiUrl);
		let comunas = await response.json();

		let comunaEncontrada;
		if (comunas.some((comuna) => comuna.comuna == formattedNombre)) {
			comunaEncontrada = comunas.filter((comuna) => {
				return comuna.comuna == formattedNombre;
			});
			// Se utiliza forEach en caso de que haya mas de una comuna con el mismo nombre, para que se inserten todos los datos
			comunaEncontrada.forEach((comuna) => insertarDatos(comuna));
		} else {
			insertarError();
		}
	} catch (error) {
		console.log(error);
	}
};

// Inserta contenido para 2 escenarios
const insertarError = () => {
	datosComuna.innerHTML = `<h3 class="display-6">La comuna ingresada no está en el registro</h3>`;
};
const insertarDatos = (comuna) => {
	datosComuna.innerHTML += `
        <h4 class="display-6">Comuna: ${comuna.comuna}</h4>
        <h4 class="display-6">Región: ${comuna.region}</h4>
        <h4 class="display-6">
            La concentración de la contaminacion en el aire es de ${comuna.realtime[0].tableRow.value}µg/m3
        </h4>
        <h4 class="display-6">La calidad del aire es ${comuna.realtime[0].tableRow.status}</h4>
        <hr>
    `;
};
