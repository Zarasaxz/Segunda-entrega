let modalResumen = document.getElementById("resumenCotizador");
let btnResumen = document.getElementById("btnResumen");
let spanResumen = document.getElementsByClassName("close")[0];

btnResumen.onclick = function () {
    modalResumen.style.display = "block";
}

spanResumen.onclick = function () {
    modalResumen.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modalResumen) {
        modalResumen.style.display = "none";
    }
}