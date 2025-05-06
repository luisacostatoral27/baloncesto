// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#grafica");
// Las etiquetas son las porciones de la gráfica
const etiquetas = ["USA", "Paises Bajos", "Israel", "Gran Bretaña","Australia","Canadá", "Argentina","Alemania", "Francia","West Germany","Japón","Otros"]
// Podemos tener varios conjuntos de datos. Comencemos con uno
const medallas = {
    data: [25, 13, 12, 10, 8, 8, 5, 5, 4,4,3,5], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
    backgroundColor: [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(201, 203, 207, 0.8)',
    'rgba(255, 99, 71, 0.8)',
    'rgba(144, 238, 144, 0.8)',
    'rgba(173, 216, 230, 0.8)',
    'rgba(238, 130, 238, 0.8)',
    'rgba(240, 230, 140, 0.8)'
        

    ],// Color de fondo
    borderColor: [
        'rgba(163,221,203,1)',
        'rgba(232,233,161,1)',
        'rgba(230,181,102,1)',
        'rgba(229,112,126,1)',
    ],// Color del borde
    borderWidth: 1,// Ancho del borde
};
new Chart($grafica, {
    type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
    data: {
        labels: etiquetas,
        datasets: [
            medallas,
            // Aquí más datos...
        ]
    },
});
// Obtener una referencia al elemento canvas del DOM
const $barras = document.querySelector("#barras"); // Obtener una referencia al elemento canvas del DOM
// Las etiquetas son las que van en el eje X. 
const paises = ["USA", "Canadá", "Israel", "Paises Bajos","Australia","West Germany", "Alemania","Argentina"]
// Podemos tener varios conjuntos de datos
const medallasoro = {
    label: "Gold",
    data: [14, 6, 4, 3,2,2,1,1], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(212,175,55, 1)', // Color de fondo
    borderColor: 'rgba(212, 175, 55, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const medallasplata = {
    label: "Silver",
    data: [3, 1, 4, 6,5,2,3,2], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(192, 192, 192, 0.9)',// Color de fondo
    borderColor: 'rgba(192, 192, 192, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};
const medallasbronce = {
    label: "Bronze",
    data: [8, 1,4, 4,1,0,1,2], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(205,127,50, 1)',// Color de fondo
    borderColor: 'rgba(205, 127, 50, 1)',// Color del borde
    borderWidth: 1,// Ancho del borde
};

new Chart($barras, {
    type: 'bar',// Tipo de gráfica
    data: {  // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
        // Las etiquetas son las que van en el eje X.
        labels: paises,
        datasets: [ // Podemos tener varios conjuntos de datos
            // Aquí más datos...
            medallasoro,
            medallasplata,
            medallasbronce,
        ]
    },
    options: {
        responsive:true,
        scales: {
            y: {
                ticks: {
                    beginAtZero: true
                }
            },
        },
    }
});
