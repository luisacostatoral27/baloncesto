let momentos = [];

async function cargarMomentos() {
  if (location.protocol === "file:") {
    const ruta = location.pathname.includes("categoria.html") ? "categorias" : "momentos";
    momentos = datosLocal[ruta];
    iniciarMomentos();
  } else {
    const res = await fetch(document.body.dataset.json);
    momentos = await res.json();
    iniciarMomentos();
  }
}

const datosLocal = {
  momentos: [
  {
    "titulo": "Lo más destacado de los juegos Paralimpicos ",
    "descripcion": "Momento icónico del atleta español.",
    "youtubeId": "HgQ1hkoVGgI"
  },
  {
    "titulo": "Ceremonia de Clausura",
    "descripcion": "Gran logro de la delegación mexicana.",
    "youtubeId": "5hw3c78CvKs"
  },
  {
    "titulo": "Los atletas celebran los juegos paralimpicos",
    "descripcion": "Celebración de los atletas en la ceremonia de apertura.",
    "youtubeId": "RVSjZnDKkME"
  },
  {
    "titulo": "Brasil en los juegos paralimpicos 2024",
    "descripcion": "Victoria emocionante de Brasil en los 200m.",
    "youtubeId": "BbPrlSBS_Rk"
  },
  {
    "titulo": "Australia en los juegos paralimpicos 2024",
    "descripcion": "Australia destaca en natación.",
    "youtubeId": "SmPEUcb6QhU"
  },
  {
    "titulo":"India en los juegos paralimpicos 2024",
    "descripcion": "Increíble actuación de la atleta india.",
    "youtubeId": "ehsGAD2gdVI"
  },
  {
    "titulo":"Colombia en los juegos paralimpicos 2024",
    "descripcion": "Colombia celebra su primera medalla de oro.", 
    "youtubeId": "MFiltNnJtnM"
  },
  {
    "titulo":"Nueva Zelanda en los juegos paralimpicos 2024",
    "descripcion": "Nueva Zelanda brilla en los juegos paralimpicos.",
    "youtubeId": "6UglX5uRhNQ"
  },
  {
    "titulo":"Francia en los juegos paralimpicos 2024",
    "descripcion": "Francia conquista el oro en baloncesto.",
    "youtubeId": "kM2TcfPyAfY"
  },
  {
    "titulo":"Italia en los juegos paralimpicos 2024",
    "descripcion": "Italia celebra su victoria en natación.",
    "youtubeId": "Jh3Lw6g3hL0"
  },
  {
    "titulo":"Estados Unidos en los juegos paralimpicos 2024",
    "descripcion": "Estados Unidos arrasa en atletismo.",
    "youtubeId": "hBgG3nbwIg0"
  },
  {
    "titulo":"España en los juegos paralimpicos 2024",
    "descripcion": "España brilla en los juegos paralimpicos.",
    "youtubeId": "SL-Val8Mk9Y"
  },
  {
    "titulo":"Paises Bajos en los juegos paralimpicos 2024",
    "descripcion": "Países Bajos destaca en ciclismo.",
    "youtubeId": "Nwk-W06d03I"
  },
  {
    "titulo": "Gran Bretaña en los juegos paralimpicos 2024",
    "descripcion": "Gran Bretaña triunfa en esgrima.",
    "youtubeId": "edMgDGRlZXo"
  },
  {
    "titulo":"México en los juegos paralimpicos 2024",
    "descripcion": "México celebra su medalla de plata.",
    "youtubeId": "ubuvtCnvqiM"
  },
  {
    "titulo":"Malasya en los juegos paralimpicos 2024",
    "descripcion": "Malasia sorprende con su actuación en judo.",
    "youtubeId": "pM5wl28pmsk"
  },
  {
    "titulo":"Japón en los juegos paralimpicos 2024",
    "descripcion": "Japón conquista el oro en voleibol sentado.",
    "youtubeId": "ARBuzUT4DOE"
  },
  {
    "titulo":"Alemania en los juegos paralimpicos 2024",
    "descripcion": "Alemania brilla en los juegos paralimpicos.",
    "youtubeId": "aybQdTPpX1U"
  },
  {
    "titulo":"Canada en los juegos paralimpicos 2024",
    "descripcion": "Canadá celebra su medalla de bronce.",
    "youtubeId": "8FQNoRkGo4U"
  },
  {
    "titulo":"Sudafrica en los juegos paralimpicos 2024",
    "descripcion": "Sudáfrica destaca en atletismo.",
    "youtubeId": "CEUmwfdvP6E"
  }
  ],
  categorias: [
  {
    "titulo": "Lo más destacado del tiro paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Tiro",
    "youtubeId": "2HAZEJVdqrk"
  },
  {
    "titulo": "Lo más destacado del remo paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Remo",
    "youtubeId": "Cu3_Jqgz0lE"
  },
  {
    "titulo": "Lo más destacado del tiro con arco paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Tiro con Arco",
    "youtubeId": "eiwbTzqctco"
  },
  {
    "titulo": "Lo más destacado del Baloncesto en silla de ruedas | Juegos Paralímpicos París 2024",
    "categoria": "Baloncesto",
    "youtubeId": "Qc8Mj7wKBxY"
  },
  {
    "titulo":"Lo más destacado de Boccia Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Boccia",
    "youtubeId": "nbCDzPwDNMg"
  },
  {
    "titulo":"Lo más destacado de Taekwondo Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Taekwondo",
    "youtubeId": "8OpkIlrN3ns"
  },
  {
    "titulo":"Lo más destacado de Esgrima Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Esgrima",
    "youtubeId": "WRnPC3theDY"
  },
  {
    "titulo":"Lo más destacado de Equitación Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Equitación",
    "youtubeId": "x9XPPP9LbaE"
  },
  {
    "titulo":"Lo más destacado del Tenis Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Tenis",
    "youtubeId": "fwiKOQm9y1s"
  },
  {
    "titulo":"Lo más destacado del Judo Paralímpico | Juegos Paralímpicos París 2024",
    "categoria":"Judo",
    "youtubeId": "kPFPnTzPJ4c"
  },
  {
    "titulo":"Lo más destacado de Canoa Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Canoa",
    "youtubeId": "FvaUUTtXBfY"
  },
  {
    "titulo":"Lo más destacado de Rugby Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Rugby",
    "youtubeId": "8TENM1368hI"
  },
  {
    "titulo":"Lo más destacado de Halterofilia Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Halterofilia",
    "youtubeId": "GUfDJc0Bgt8"
  },
  {
    "titulo":"Lo más destacado de VoleyBall Paralímpica | Juegos Paralímpicos París 2024",
    "categoria": "VoleyBall",
    "youtubeId": "z16J2m69MIA"
  },
  {
    "titulo":"Lo más destacado de Ping Pong Paralímpica | Juegos Paralímpicos París 2024",
    "categoria": "Ping Pong",
    "youtubeId": "1ndJ9V3pmD0"
  },
  {
    "titulo":"Lo más destacado de Ciclismo Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Ciclismo",
    "youtubeId": "k7gCsB55Bwo"
  },
  {
    "titulo":"Lo más destacado de Triatlón Paralímpica | Juegos Paralímpicos París 2024",
    "categoria": "Triatlón",
    "youtubeId": "DtVyOewaX3Y"
  },
  {
    "titulo":"Lo más destacado del Golball Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Golball",
    "youtubeId": "T57gFEtMuSw"
  },
  {
    "titulo":"Lo más destacado de Badminton Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Badminton",
    "youtubeId": "hUOmHBz9-3U"
  },
  {
    "titulo":"Lo más destacado de Natación Paralímpica | Juegos Paralímpicos París 2024",
    "categoria": "Natación",
    "youtubeId": "FbRf_l0BM7M"
  },
  {
    "titulo":"Lo más destacado de Atletismo Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Atletismo",
    "youtubeId": "xddkeA6fstw"
  },
  {
    "titulo":"Lo más destacado de Fútbol para ciegos Paralímpico | Juegos Paralímpicos París 2024",
    "categoria": "Fútbol para ciegos",
    "youtubeId": "ZOdJZYDfcJU"
  }
  ]
};

function iniciarMomentos() {
  if (momentos.some(m => m.descripcion)) {
    const wrapper = document.getElementById("buscador-wrapper");
    if (wrapper) {
      wrapper.innerHTML = `<input type="text" id="buscador" placeholder="Buscar..." onkeyup="buscar()" />`;
      wrapper.style.display = "block";
    }
  }

  if (momentos.some(m => m.categoria)) {
    const select = document.getElementById("categoriaSelect");
    if (select) generarOpcionesCategorias(select);
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
  galeria.className = esBusqueda && data.length === 1 ? "momentos-listado" : "momentos-galeria";
  galeria.innerHTML = "";

  if (esBusqueda) {
    const volverBtn = document.createElement("button");
    volverBtn.textContent = "🔙 Ver todos";
    volverBtn.className = "btn-volver";
    volverBtn.onclick = () => {
      renderizarMomentos(momentos, false);
      const select = document.getElementById("categoriaSelect");
      if (select) select.value = "Todos";
      const buscador = document.getElementById("buscador");
      if (buscador) buscador.value = "";
    };
    const contenedorBoton = document.createElement("div");
    contenedorBoton.style.textAlign = "center";
    contenedorBoton.style.gridColumn = "1 / -1";
    contenedorBoton.appendChild(volverBtn);
    galeria.appendChild(contenedorBoton);
  }

  data.forEach(momento => {
    const div = document.createElement("div");
    div.className = "momento";
    const claseContenedor = esBusqueda ? "iframe-container grande" : "iframe-container pequeno";

    div.innerHTML = `
      <h3>${momento.titulo}</h3>
      <div class="${claseContenedor}">
        <iframe data-src="https://www.youtube.com/embed/${momento.youtubeId}" loading="lazy" allowfullscreen></iframe>
      </div>
      ${momento.descripcion ? `<p>${momento.descripcion}</p>` : ""}
    `;

    div.addEventListener("click", () => renderizarMomentos([momento], true));
    galeria.appendChild(div);
  });

  // Lazy load con IntersectionObserver
  const iframes = document.querySelectorAll("iframe[data-src]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        iframe.src = iframe.dataset.src;
        observer.unobserve(iframe);
      }
    });
  }, {
    rootMargin: "300px"
  });

  iframes.forEach(iframe => observer.observe(iframe));

  // Reobserva tras cambios de tamaño (responsive)
  window.addEventListener("resize", () => {
    document.querySelectorAll("iframe[data-src]").forEach(iframe => {
      if (!iframe.src) observer.observe(iframe);
    });
  });
}

window.onload = cargarMomentos;
