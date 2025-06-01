let momentos = [];

async function cargarMomentos() {
  const res = await fetch("../data/momentos.json");
  momentos = await res.json();
  renderizarMomentos(momentos, false); // vista cuadrícula
}

function renderizarMomentos(data, esBusqueda = false) {
  const galeria = document.getElementById("galeria");
  galeria.className = esBusqueda ? "momentos-listado" : "momentos-galeria";
  galeria.innerHTML = "";

  // Botón para volver a todos los momentos si estás en vista de búsqueda
  if (esBusqueda && data.length < momentos.length) {
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "🔙 Ver todos";
    volverBtn.style.cssText = `
      display: block;
      margin: 0 auto 1.5rem;
      padding: 10px 16px;
      background-color: #003366;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
    `;
    volverBtn.onclick = () => renderizarMomentos(momentos, false);
    galeria.appendChild(volverBtn);
  }

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

    // Al hacer clic en cualquier momento: mostrar solo ese, en modo búsqueda
    div.addEventListener("click", () => {
      renderizarMomentos([momento], true);
    });

    galeria.appendChild(div);
  });
}

function buscar() {
  const query = document.getElementById("buscador").value.toLowerCase();

  if (query === "") {
    renderizarMomentos(momentos, false); // vista cuadrícula
    return;
  }

  const resultados = momentos.filter((m) =>
    m.titulo.toLowerCase().includes(query) ||
    m.descripcion.toLowerCase().includes(query)
  );

  renderizarMomentos(resultados, true); // vista de búsqueda
}

window.onload = cargarMomentos;
