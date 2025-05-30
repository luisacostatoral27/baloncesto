let momentos = [];

async function cargarMomentos() {
  const res = await fetch("../data/momentos.json");
  momentos = await res.json();
  renderizarMomentos(momentos, false); // modo cuadrícula
}

function renderizarMomentos(data, esBusqueda = false) {
  const galeria = document.getElementById("galeria");

  // Cambia el estilo del contenedor
  galeria.className = esBusqueda ? "momentos-listado" : "momentos-galeria";

  galeria.innerHTML = "";

  data.forEach((momento) => {
    const div = document.createElement("div");
    div.className = "momento";

    const claseContenedor = esBusqueda ? "iframe-container grande" : "iframe-container pequeno";

    div.innerHTML = `
      <h3>${momento.titulo}</h3>
      <div class="${claseContenedor}">
        <iframe src="https://www.youtube.com/embed/${momento.youtubeId}" allowfullscreen></iframe>
      </div>
      <p>${momento.descripcion}</p>
    `;

    galeria.appendChild(div);
  });
}

function buscar() {
  const query = document.getElementById("buscador").value.toLowerCase();

  if (query === "") {
    renderizarMomentos(momentos, false); // cuadrícula pequeña
    return;
  }

  const resultados = momentos.filter((m) =>
    m.titulo.toLowerCase().includes(query) ||
    m.descripcion.toLowerCase().includes(query)
  );

  renderizarMomentos(resultados, true); // vista de búsqueda
}

window.onload = cargarMomentos;
