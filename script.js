
  // >>> script.js <<<


document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
    const table = document.querySelector("table");

    if (form && table) {
        form.addEventListener("input", () => {
        const campos = {
            Nombre: form.nombre.value,
            Apellido: form.apellido.value,
            Email: form.email.value,
            Teléfono: form.telefono.value,
            Edad: form.edad.value,
            Dirección: form.direccion.value,
            Provincia: form.provincia.value,
            "Código Postal": form.cp.value,
            "Método de contacto": obtenerContacto(form),
            Suscripción: obtenerSuscripciones(form),
        };

        for (let i = 1; i < table.rows.length; i++) {
            const campo = table.rows[i].cells[0].textContent;
            table.rows[i].cells[1].textContent = campos[campo] || "";
        }
    });
    }

    function obtenerContacto(form) {
    const seleccionado = form.querySelector("input[name='contacto']:checked");
    return seleccionado ? seleccionado.value : "";
    }

    function obtenerSuscripciones(form) {
    const seleccionados = form.querySelectorAll("input[type='checkbox']:checked");
    return Array.from(seleccionados).map(c => c.value).join(", ");
    }

    const btnLeerMas = document.getElementById("btnLeerMas");
    const textoExtra = document.getElementById("textoExtra");

    if (btnLeerMas && textoExtra) {
    const puntos = document.getElementById("puntos");

    btnLeerMas.addEventListener("click", () => {
        const visible = textoExtra.style.display === "block";

        textoExtra.style.display = visible ? "none" : "block";
        btnLeerMas.textContent = visible ? "Leer más" : "Leer menos";

        // Mostrar u ocultar los tres puntos
        if (puntos) puntos.style.display = visible ? "inline" : "none";
    });
    }
});
