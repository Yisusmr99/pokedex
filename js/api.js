// funcion para obtener los tipos de pokemon
async function getTypes() {
    const url = 'https://pokeapi.co/api/v2/type?limit=50';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching types:', error);
        return [];
    }
}

// Función para crear un botón de tipo
function createTypeButton(type, isAllTypes = false) {
    const li = document.createElement('li');
    li.classList.add('nav-item');

    const button = document.createElement('button');
    button.classList.add('nav-link', 'type-button');
    button.setAttribute('data-type', isAllTypes ? 'all' : type.name);

    // Aplicar estilos comunes
    Object.assign(button.style, {
        margin: '0.25rem',
        borderRadius: '1.5rem',
        minWidth: '5rem',
        textAlign: 'center',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
        fontSize: '0.9rem'
    });

    if (isAllTypes) {
        button.style.backgroundColor = '#ececec';
        button.style.color = 'black';
        button.textContent = 'VER TODOS';
        button.id = 'all-types';
    } else {
        button.style.backgroundColor = `var(--type-${type.name})`;
        button.style.color = 'white';
        button.textContent = type.name.toUpperCase();
        button.id = type.name;
    }

    // Efecto hover
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });

    li.appendChild(button);
    return li;
}

// Función para renderizar los tipos en el DOM
function renderTypes(types, container) {
    // Limpiar contenedor
    container.innerHTML = '';

    if (types.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No hay tipos disponibles';
        emptyMessage.style.padding = '1rem';
        emptyMessage.style.textAlign = 'center';
        container.appendChild(emptyMessage);
        return;
    }

    // Agregar botón "VER TODOS"
    container.appendChild(createTypeButton(null, true));

    // Agregar botones de tipos
    types.forEach(type => {
        container.appendChild(createTypeButton(type));
    });
}

// Función para configurar eventos de los botones
function setupTypeButtonEvents(container) {
    // Usar delegación de eventos para mejor rendimiento
    container.addEventListener('click', (event) => {
        const button = event.target.closest('.type-button');
        if (button) {
            // Remover clase activa de todos los botones
            container.querySelectorAll('.type-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase activa al botón clickeado
            button.classList.add('active');

            // Obtener el tipo del atributo data
            const type = button.getAttribute('data-type');
            getTypePokemon(type);
        }
    });
}

// Función principal para inicializar la aplicación
async function initializeApp() {
    try {
        const optionsTypes = document.getElementById('options-types');

        if (!optionsTypes) {
            console.error('Elemento options-types no encontrado');
            return;
        }

        // Mostrar indicador de carga
        optionsTypes.innerHTML = `
            <li style="text-align: center; padding: 1rem;">
                <div class="loading-container">
                    <div class="spinner"></div>
                    <div class="loading-text">Cargando tipos...</div>
                </div>
            </li>`;

        // Obtener tipos de la API
        const types = await getTypes();

        // Renderizar tipos
        renderTypes(types, optionsTypes);

        // Configurar eventos
        setupTypeButtonEvents(optionsTypes);

        console.log('Aplicación inicializada correctamente');

    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        const optionsTypes = document.getElementById('options-types');
        if (optionsTypes) {
            optionsTypes.innerHTML = '<li style="text-align: center; padding: 1rem; color: red;">Error al cargar los tipos</li>';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);


// Función mejorada para manejar la selección de tipos
function getTypePokemon(type) {
    console.log('Tipo seleccionado:', type);

    // Aquí puedes agregar la lógica para filtrar pokémon por tipo
    if (type === 'all') {
        console.log('Mostrando todos los pokémon');
        // Lógica para mostrar todos los pokémon
    } else {
        console.log(`Filtrando pokémon de tipo: ${type}`);
        // Lógica para filtrar por tipo específico
    }
}