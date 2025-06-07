let momentos = [];

async function cargarMomentos() {
  const res = await fetch(document.body.dataset.json); // Obtener la URL del JSON desde el atributo data-json del body await fetch(res) hace la petición al servidor document.body.dataset.json hace referencia al atributo data-json del body;

  // Cargar los momentos desde el JSON
  momentos = await res.json();

  // Mostrar buscador si hay descripciones (para mejores_momentos.html)
  if (momentos.some(m => m.descripcion)) {
    const wrapper = document.getElementById("buscador-wrapper");
    if (wrapper) {
      wrapper.innerHTML = `
        <input type="text" id="buscador" placeholder="Buscar..." onkeyup="buscar()" />
      `;
      wrapper.style.display = "block";
    }
  }

  // Generar <select> de categorías (para categoria.html)
  if (momentos.some(m => m.categoria)) {
    const select = document.getElementById("categoriaSelect");
    if (select) {
      generarOpcionesCategorias(select);
    }
  }

  renderizarMomentos(momentos, false);
}

function generarOpcionesCategorias(select) {
  const categoriasUnicas = [...new Set(momentos.map(m => m.categoria))];
  categoriasUnicas.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function seleccionarCategoria(categoria) {
  if (categoria === "Todos") {
    renderizarMomentos(momentos, false);
  } else {
    const filtrados = momentos.filter(m => m.categoria === categoria);
    renderizarMomentos(filtrados, true);
  }
}

function buscar() {
  const query = document.getElementById("buscador")?.value?.toLowerCase() || "";
  if (query === "") {
    renderizarMomentos(momentos, false);
    return;
  }

  const resultados = momentos.filter(m =>
    m.titulo.toLowerCase().includes(query) ||
    (m.descripcion && m.descripcion.toLowerCase().includes(query))
  );

  renderizarMomentos(resultados, true);
}

function renderizarMomentos(data, esBusqueda = false) {
  const galeria = document.getElementById("galeria");
  galeria.className = esBusqueda ? "momentos-listado" : "momentos-galeria";
  galeria.innerHTML = "";

  if (esBusqueda) {
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "🔙 Ver todos";
    volverBtn.className = "btn-volver";

    volverBtn.onclick = () => {
      renderizarMomentos(momentos, false);

      // Reiniciar selector de categoría si existe
      const select = document.getElementById("categoriaSelect");
      if (select) select.value = "Todos";

      // Limpiar buscador si existe
      const buscador = document.getElementById("buscador");
      if (buscador) buscador.value = "";
    };

    galeria.appendChild(volverBtn);
  }

  data.forEach(momento => {
    const div = document.createElement("div");
    div.className = "momento";

    const claseContenedor = esBusqueda ? "iframe-container grande" : "iframe-container pequeno";

    div.innerHTML = `
      <h3>${momento.titulo}</h3>
      <div class="${claseContenedor}">
        <iframe src="https://www.youtube.com/embed/${momento.youtubeId}" allowfullscreen></iframe>
      </div>
      ${momento.descripcion ? `<p>${momento.descripcion}</p>` : ""}
    `;

    div.addEventListener("click", () => {
      renderizarMomentos([momento], true);
    });

    galeria.appendChild(div);
  });
}

window.onload = cargarMomentos;
