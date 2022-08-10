let usuarios = [];
let ingresos = [];

let formulario;
let inputNombre;
let inputApellido;
let inputRun;
let inputEdad;
let tabla;
let datosRegistros;
let btnVaciar;
let btnImpr;
let btnAdd;
let formSelect;
let inputEntradas;
let inputAdults;
let inputChildren;
let listaDetalles;
let ingreso;
let totalAPagar;

function main() {
  inicializarElementos();
  inicializarEventos();
  agregarTotalDetalles();
  obtenerUsuariosLocalStorage();
  agregarUsuariosTabla();
  vaciarUsuariosLocalStorage();
  botonImprimir();
}

class Usuarios {
  constructor(ID, nombre, apellido, run, edad) {
    this.ID = ID;
    this.nombre = nombre.toUpperCase();
    this.apellido = apellido.toUpperCase();
    this.run = run;
    this.edad = edad;
  }
}

class Ingresos {
  constructor(entradas, adults, children, total) {
    this.entradas = entradas;
    this.adults = adults;
    this.children = children;
    this.total = total;
  }
}

function inicializarElementos() {
  // inicializa los elementos
  formulario = document.getElementById("formulario");
  inputNombre = document.getElementById("inputNombre");
  inputApellido = document.getElementById("inputApellido");
  inputApellidoMaterno = document.getElementById("inputApellidoMaterno");
  inputRun = document.getElementById("inputRun");
  inputEdad = document.getElementById("inputEdad");
  tabla = document.getElementById("tablaUsuarios");
  datosRegistros = document.getElementById("datosRegistros");
  btnVaciar = document.getElementById("btnVaciar");
  btnImpr = document.getElementById("btnImpr");
  formSelect = document.getElementById("formSelect");
  inputEntradas = document.getElementById("inputEntradas");
  inputAdults = document.getElementById("inputAdults");
  inputChildren = document.getElementById("inputChildren");
  listaDetalles = document.getElementById("listaDetalles");
  btnAdd = document.getElementById("btnAdd");
  totalAPagar = document.getElementById("totalAPagar");
}

function inicializarEventos() {
  formulario.onsubmit = (e) => validarFormulario(e);
  formSelect.onsubmit = (e) => validarIngresos(e);
}

function validarFormulario(e) {
  e.preventDefault();
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let run = inputRun.value;
  let edad = parseInt(inputEdad.value);
  let ID = 0;
  while (ID < usuarios.length) {
    ID++;
  }
  let usuario = new Usuarios(ID, nombre, apellido, run, edad);

  const validaNombre = () => {
    nombre === ""
      ? setErrorFor(inputNombre, "El nombre no puede estar vacío.")
      : (nombre = !isLetters(nombre)
          ? setErrorFor(inputNombre, "Debes escribir el nombre.")
          : nombre.length < 3
          ? setErrorFor(
              inputNombre,
              "El nombre debe tener al menos 3 caracteres."
            )
          : nombre.length > 20
          ? setErrorFor(
              inputNombre,
              "El nombre debe tener máximo 20 caracteres."
            )
          : setSuccessFor(inputNombre));
  };
  validaNombre(nombre);

  const validaApellido = () => {
    apellido === ""
      ? setErrorFor(inputApellido, "El apellido no puede estar vacío.")
      : (apellido = !isLetters(apellido)
          ? setErrorFor(inputApellido, "Debes escribir el apellido.")
          : apellido.length < 3
          ? setErrorFor(
              inputApellido,
              "El apellido debe tener al menos 3 caracteres."
            )
          : apellido.length > 20
          ? setErrorFor(
              inputApellido,
              "El apellido debe tener máximo 20 caracteres."
            )
          : setSuccessFor(inputApellido));
  };
  validaApellido(apellido);

  const validaRun = () => {
    run === ""
      ? setErrorFor(inputRun, "El RUN no puede estar vacío.")
      : (run = !isRun(run)
          ? setErrorFor(inputRun, "Debes escribir el run.")
          : run.length < 10
          ? setErrorFor(inputRun, "El run debe tener al menos 10 caracteres.")
          : run.length > 10
          ? setErrorFor(inputRun, "El run debe tener máximo 10 caracteres.")
          : setSuccessFor(inputRun));
  };
  validaRun(run);

  const validaEdad = () => {
    edad === ""
      ? setErrorFor(inputEdad, "La edad no puede estar vacía.")
      : edad <= 0
      ? setErrorFor(inputEdad, "La edad debe ser mayor a 0.")
      : edad > 100
      ? setErrorFor(inputEdad, "La edad debe ser menor a 100.")
      : setSuccessFor(inputEdad);
  };
  validaEdad(edad);

  if (
    usuarios !== "" &&
    isLetters(nombre) &&
    isLetters(apellido) &&
    isLetters(apellidoMaterno) &&
    !isRun(run) &&
    edad > 0 &&
    edad <= 100
  ) {
    usuarios.push(usuario);
    formulario.reset();

    limpiarTabla();
    agregarUsuariosTabla();
    almacenarUsuariosLocalStorage();

    const Toast = Swal.mixin({
      toast: true,
      background: "#f7e6ba",
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: "Agregado correctamente",
    });
  } else {
    alertError();
  }
}

function validarIngresos(e) {
  e.preventDefault();
  let Entradas = parseInt(inputEntradas.value);
  let adults = parseInt(inputAdults.value);
  let children = parseInt(inputChildren.value);
  let total = adults + children;
  let ingreso = new Ingresos(Entradas, adults, children, total);
  ingresos.push(ingreso);
  agregarTotalDetalles();
}

function agregarTotalDetalles() {
  ingresos.forEach((ingreso) => {
    let Detalle = document.createElement("ul");
    Detalle.innerHTML = `
      <li>Entradas: ${ingreso.Entradas}</li>
      <li>Adultos: ${ingreso.adults}</li>
      <li>Niños: ${ingreso.children}</li>
      <li>Total ingresos: ${ingreso.total}</li>
      `;
    listaDetalles.appendChild(Detalle);
  });
}

function agregarUsuariosTabla() {
  usuarios.forEach((usuario) => {
    let filaTabla = document.createElement("tr");
    filaTabla.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.run}</td>
      <td>${usuario.edad}</td>`;
    tabla.tBodies[0].append(filaTabla);
  });
}

function limpiarTabla() {
  while (tabla.rows.length > 1) {
    tabla.deleteRow(1);
  }
}

function almacenarUsuariosLocalStorage() {
  localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
  let usuariosAlmacenados = localStorage.getItem("listaUsuarios");
  usuariosAlmacenados === null
    ? (usuarios = [])
    : (usuarios = JSON.parse(usuariosAlmacenados));
}

function vaciarUsuariosLocalStorage() {
  btnVaciar.onclick = () => localStorage.removeItem("listaUsuarios");
}
function botonImprimir() {
  btnImpr.onclick = () => window.print();
}

main();
