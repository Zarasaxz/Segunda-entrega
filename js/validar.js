// Valida datos de usuarios 
function setErrorFor(input, message) { // elimina el error de los campos
	const formControl = input.parentElement; 
	const small = formControl.querySelector('small');
	// agrega el mensaje de error debajo de small
	small.innerText = message;
	//agrega la clase error
	formControl.className = 'form-control error';
} // fin de la función setErrorFor

function setSuccessFor(input) { // elimina el error de los campos
	const formControl = input.parentElement; // .form-control
	formControl.className = 'form-control success';
} // fin de la función setSuccessFor

function isEmail(inputEmail) { // valida el correo electrónico
	return /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(inputEmail);
}


function isRun(inputRun) { 
	return /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(inputRun);
} // fin de la función isRut

function isLetters(inputLetters) { // valida las letras
	return /^[a-zA-Z\s]+$/.test(inputLetters);
} // fin de la función isLetters

function alertError() { 
	const Toast = Swal.mixin({
		toast: true,
		background: '#f7e6ba',
		position: 'top-end',
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
	})
	Toast.fire({
		icon: 'error',
		title: 'Por favor, verifique los datos ingresados'
	})
} // fin de la función alertError