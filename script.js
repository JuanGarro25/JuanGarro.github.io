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

            if (puntos) puntos.style.display = visible ? "inline" : "none";
        });
    }
});



const emojis = ["💻","🖥️","⌨️","🖱️","💾","🧩","🔌","👾","🤖"];

let cartas, carta1, carta2, bloqueo, aciertos, movimientos;
let tiempo = 0;
let intervalo;

const tablero = document.getElementById("tablero");

document.getElementById("btnInicio").onclick = iniciarJuego;

function iniciarJuego() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("contenedorJuego").style.display = "block";
    reiniciar();
}

function reiniciar() {
    tablero.innerHTML = "";
    carta1 = null;
    carta2 = null;
    bloqueo = false;
    aciertos = 0;
    movimientos = 0;
    tiempo = 0;

    document.getElementById("tiempo").innerText = tiempo;
    document.getElementById("movs").innerText = movimientos;

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        tiempo++;
        document.getElementById("tiempo").innerText = tiempo;
    }, 1000);

    cartas = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    cartas.forEach((emoji) => {
        const div = document.createElement("div");
        div.classList.add("carta", "oculta");

        const span = document.createElement("span");
        span.innerHTML = emoji;

        div.appendChild(span);
        div.dataset.valor = emoji;

        div.addEventListener("click", () => descubrir(div));

        tablero.appendChild(div);
    });

    document.getElementById("modal").style.display = "none";
}

function descubrir(carta) {
    if (bloqueo || carta.classList.contains("visible") || carta === carta1) return;

    carta.classList.remove("oculta");
    carta.classList.add("visible");

    if (!carta1) {
        carta1 = carta;
    } else {
        carta2 = carta;
        movimientos++;
        document.getElementById("movs").innerText = movimientos;
        comparar();
    }
}

function comparar() {
    bloqueo = true;

    if (carta1.dataset.valor === carta2.dataset.valor) {

        aciertos++;

        carta1.style.background = "#0a793a";
        carta2.style.background = "#0a793a";

        carta1 = null;
        carta2 = null;
        bloqueo = false;

        if (aciertos === emojis.length) ganar();

    } else {
        setTimeout(() => {
            carta1.classList.remove("visible");
            carta1.classList.add("oculta");

            carta2.classList.remove("visible");
            carta2.classList.add("oculta");

            carta1 = null;
            carta2 = null;
            bloqueo = false;

        }, 700);
    }
}

function ganar() {
    clearInterval(intervalo);

    document.getElementById("datosFinales").innerHTML =
        `⏳ Tiempo: <b>${tiempo}</b>s<br>🖱️ Movimientos: <b>${movimientos}</b>`;

    document.getElementById("modal").style.display = "flex";

    document.getElementById("modalReiniciar").onclick = cerrarModalYReiniciar;
}

function cerrarModalYReiniciar() {
    document.getElementById("modal").style.display = "none";
    reiniciar();
}
