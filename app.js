/*fetch ("http://localhost:3000/equipos")
    .then (response => response.json())
    .then (data =>  console.log(data));

    fetch ("http://localhost:3000/partidos")
    .then (response => response.json())
    .then (data =>  console.log(data));*/

try {
    const response = await fetch("http://localhost:3000/partidos");
    if (!response.ok) {
        throw new Error("Error HTTP: " + response.status);
    }
    const partidos = await response.json();
    console.log(data);
} catch (error) {
    console.error("Hubo un problema:", error);
}
try {
    const response = await fetch("http://localhost:3000/equipos");
    if (!response.ok) {
        throw new Error("Error HTTP: " + response.status);
    }
    const equipos = await response.json();
    console.log(data);
} catch (error) {
    console.error("Hubo un problema:", error);
}


const partidosHTML = partidos.map(partido => {
const eq1 = equipos.find(equipo => equipo.id === partido.equipoLocal);
return ` <div class="resultado">
      <div class="equipo"> 
        <img src="uruguay.png" alt="uruguay">
        <p>${eq1.nombre}</p>
      </div>
      <div class="rel">
        <div class="golesLocal">1</div>
        <div class="separator">-</div>
        <div class="golesVisitante">0</div>
      </div>
      <div class="equipo"> 
        <img src="brasil.jpg" alt="brasil">
        <p>Equipo 2</p>
      </div>
    </div>` 

}
    
))

// obtener elemento con clase resultados
// elementoObtenido.innerHTML = partidosHTML.join(',');