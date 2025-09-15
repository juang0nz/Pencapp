/*fetch ("http://localhost:3000/equipos")
    .then (response => response.json())
    .then (data =>  console.log(data));

    fetch ("http://localhost:3000/partidos")
    .then (response => response.json())
    .then (data =>  console.log(data));*/
    
async function request(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error HTTP: " + response.status);
    }
    return await response.json();
}

async function mostrarPartidos() {
    const partidos = await request("http://localhost:3000/partidos");
    const equipos = await request("http://localhost:3000/equipos");

    const btn = document.getElementById("guardarTodos");
    // cargarle el evento de on click con el listener

    btn.addEventListener("click", guardarTodosResultados);

    const partidosHTML = partidos.map(partido => {
        const eq1 = equipos.find(equipo => equipo.id === partido.equipoLocal);
        const eq2 = equipos.find(equipo => equipo.id === partido.equipoVisitante);
        const imgDeEquipo1 = eq1?.img;
        const imgDeEquipo2 = eq2?.img; 
        const golesLocales = partido.golesLocal;
        const golesVisitantes = partido.golesVisitante;
        return `<div class="resultado" id="${partido.id}">
            <div class="equipo">
                <img src="${imgDeEquipo1}" alt="${eq1.nombre}">
                <p>${eq1.nombre}</p>
            </div>
            <div class="rel">
                <input type="number" class="golesLocal" value="${partido.golesLocal}">
                <span class="separator">-</span>
                <input type="number" class="golesVisitante" value="${partido.golesVisitante}">
            </div>
            <div class="equipo"> 
                <img src="${imgDeEquipo2}" alt="${eq2.nombre}">
                <p>${eq2.nombre}</p>
            </div>
            <button onclick="eliminarPartido(${partido.id})">Eliminar</button>
        </div>`
    });
    document.getElementById("resultados").innerHTML = partidosHTML.join('');
}


async function guardarTodosResultados() {
    const resultados = document.querySelectorAll('.resultado');
    for (const resultadoDiv of resultados) {
        const partidoId = resultadoDiv.getAttribute('id');
        const golesLocal = resultadoDiv.querySelector('.golesLocal').value;
        const golesVisitante = resultadoDiv.querySelector('.golesVisitante').value;

        await fetch(`http://localhost:3000/partidos/${partidoId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                golesLocal: Number(golesLocal),
                golesVisitante: Number(golesVisitante)
            })
        });
    
    }
}

async function eliminarPartido(partidoId) {
    await fetch(`http://localhost:3000/partidos/${partidoId}`, {
        method: 'DELETE'
    });
    // Elimina el div del DOM
    const divcorrespondiente = document.getElementById(partidoId);
    if (divcorrespondiente) {
        divcorrespondiente.remove();
    }
}
