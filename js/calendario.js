const monthSelect = document.getElementById('month-select'); // Selector de mes
const yearSelect = document.getElementById('year-select');  // Selector de año
const calendarBody = document.getElementById('calendar-body');  // Cuerpo del calendario

const eventColors = {
    type1: 'red', // Colores para los eventos de entrenamiento
    type2: 'darkblue', // Colores para los eventos de entrenamiento y partido
    type3: 'red' // Colores para los eventos festivos
};
const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']; // Array de días de la semana
// Selecciona el elemento del calendario y los selectores de mes y año
generateCalendarHeader(); // Genera la cabecera del calendario con los días de la semana
// Función para llenar los selectores de mes y año
function populateMonthAndYear() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]; // Array de nombres de los meses
    months.forEach((month, index) => {
        const option = document.createElement('option'); // Crear un elemento <option> para cada mes
        option.value = index; // Establecer el valor del mes (0-11)
        option.textContent = month; // Establecer el texto visible del mes
        monthSelect.appendChild(option); // Agregar la opción de mes al elemento <select> de meses
    });
    // Establecer el mes y año actuales al cargar la página
    window.addEventListener('load', () => {
        const currentDate = new Date(); // Obtener la fecha actual
        monthSelect.value = currentDate.getMonth(); // Establecer el mes actual
        yearSelect.value = currentDate.getFullYear(); // Establecer el año actual
        generateCalendar(currentDate.getMonth(), currentDate.getFullYear()); // Generar el calendario inicial
        markHolidays(); // Marcar los festivos en el calendario inicial
    });

    const currentYear = new Date().getFullYear();
    // Generar un rango de años desde 70 años atrás hasta 70 años adelante
    for (let year = currentYear - 70; year <= currentYear + 70; year++)  {
        const option = document.createElement('option'); // Crear un elemento <option> para cada año
        option.value = year; // Establecer el valor del año
        option.textContent = year; // Establecer el texto visible del año
        yearSelect.appendChild(option); // Agregar la opción de año al elemento <select> de años
    }
    let holidays = [
        { day: 1, month: 0 }, // Año Nuevo (1 de Enero)
        { day: 6, month: 0 }, // Reyes Magos (6 de Enero)
        { day: 17, month: 3},
        { day: 18, month: 3 },
        { day: 1, month: 4 }, // Día del Trabajador (1 de Mayo)
        { day: 2, month: 4 }, // Día de la Madre (2 de Mayo)
        { day: 15, month: 4 },  
        { day: 15, month: 7 }, // Asunción de la Virgen (15 de Agosto)
        { day: 1, month: 10 }, 
        { day: 8, month: 10 }, // Día de Todos los Santos (1 de Noviembre)
        { day: 6, month: 11 }, // Día de la Constitución (6 de Diciembre)
        { day: 8, month: 11 }, // Inmaculada Concepción (8 de Diciembre)
        { day: 25, month: 11 }, // Navidad (25 de Diciembre)
        { day: 12, month: 9 }, // Día de la Hispanidad (12 de Octubre)

    ];
    // Array de días festivos (día y mes) en formato { day: <día>, month: <mes> }
    // Guardar los días festivos en el almacenamiento local
    function saveHolidaysToLocalStorage() {
        localStorage.setItem('holidays', JSON.stringify(holidays)); // Guardar los días festivos en el almacenamiento local como JSON

    }
    // Guardar los días festivos en el almacenamiento local al cargar la página
    window.addEventListener('load', saveHolidaysToLocalStorage); // Guardar los días festivos en el almacenamiento local al cargar la página


    // Cargar los días festivos desde el almacenamiento local
    function loadHolidaysFromLocalStorage() {
        const storedHolidays = localStorage.getItem('holidays'); // Obtener los días festivos del almacenamiento local
        if (storedHolidays)  {
            return JSON.parse(storedHolidays); // Cargar los días festivos desde el almacenamiento local y parsear el JSON

        }
        return holidays; // Si no hay datos guardados, usar los festivos por defecto
    }
    // Marcar los días festivos en el calendario
    function markHolidays() {
        holidays.forEach(holiday => {
            const cells = calendarBody.getElementsByTagName('td');
            Array.from(cells).forEach(cell => {
                if (parseInt(cell.textContent) === holiday.day && parseInt(monthSelect.value) === holiday.month) {
                    cell.style.backgroundColor = 'red'; // Cambiar el color de fondo de la celda a rojo
                    cell.style.color = 'white'; // Cambiar el color del texto a blanco
                    cell.style.fontWeight = 'bold'; // Hacer el texto en negrita
                    cell.setAttribute('title', 'Festivo'); // Establecer un atributo title para mostrar un tooltip al pasar el ratón
                }
            });
        });
    }
    // Llamar a la función para cargar los días festivos desde el almacenamiento local
    holidays = loadHolidaysFromLocalStorage(); // Cargar los días festivos desde el almacenamiento local


    monthSelect.addEventListener('change', () => {
        generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value)); // Generar el calendario basado en el mes seleccionados
        markHolidays(); // Marcar los festivos después de generar el calendario
    });

    yearSelect.addEventListener('change', () => {
        generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));
        markHolidays(); // Marcar los festivos después de generar el calendario
    });

    markHolidays(); // Marcar los festivos en el calendario inicial

    monthSelect.value = new Date().getMonth(); // Establecer el mes actual
    yearSelect.value = currentYear; // Establecer el año actual
}
function generateCalendarHeader() {
    const headerRow = document.createElement('tr'); // Crear una fila para los días de la semana
    daysOfWeek.forEach(day => {
        const th = document.createElement('th'); // Crear un elemento <th> para cada día de la semana
        th.textContent = day; // Establecer el texto del día de la semana
        headerRow.appendChild(th); // Agregar el <th> a la fila
    }); 
    calendarBody.appendChild(headerRow); // Agregar la fila de días de la semana al cuerpo del calendario
}

function generateCalendar(month, year) {
    calendarBody.innerHTML = ''; // Limpiar el calendario antes de generar uno nuevo
    const firstDay = new Date(year, month, 0).getDay(); // 0 = Lunes, 1 = Martes, ..., 6 = Sábado
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Último día del mes

    let row = document.createElement('tr');
    for (let i = 0; i < firstDay; i++)  {
        row.appendChild(document.createElement('td')); // Agregar celdas vacías hasta el primer día del mes
    }

    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        cell.textContent = day;
        cell.addEventListener('click', () => addEvent(cell));
        row.appendChild(cell);
    }

    while (row.children.length < 7) {
        row.appendChild(document.createElement('td'));
    }
    calendarBody.appendChild(row);
}

function addEvent(cell) {
    const eventType = prompt('Ingrese el tipo de evento (entrenamiento o partido):').toLowerCase();
    if (eventType === 'entrenamiento') {
        cell.style.backgroundColor = eventColors.type1;
    } else if (eventType === 'partido') {
        cell.style.backgroundColor = eventColors.type2;
    } else {
        alert('¡Tipo de evento no válido!');
    }
   
}
function addEvent(cell) {
    const eventType = prompt('Ingrese el tipo de evento (entrenamiento o partido):').toLowerCase();

    const day = cell.textContent.trim(); // Guarda el número del día
    if (eventType === 'entrenamiento') {
        cell.innerHTML = `${day} <span class="event-icon entrenamiento" title="Entrenamiento"><i class="fas fa-dumbbell"></i></span>`;
    } else if (eventType === 'partido') {
        cell.innerHTML = `${day} <span class="event-icon partido" title="Partido"><i class="fas fa-basketball-ball"></i></span>`;
    } else {
        alert('¡Tipo de evento no válido!');
    }
}
monthSelect.addEventListener('change', () => {
    // Generar el calendario basado en el mes seleccionados
    generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));  // Generar el calendario basado en el mes seleccionados
});

yearSelect.addEventListener('change', () => {
    generateCalendar(parseInt(monthSelect.value), parseInt(yearSelect.value));  // Generar el calendario basado en el año seleccionados
});

populateMonthAndYear(); // Llamar a la función para llenar los selectores de mes y año
generateCalendar(new Date().getMonth(), new Date().getFullYear()); // Generar el calendario inicial con el mes y año actuales
