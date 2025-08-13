document.addEventListener('DOMContentLoaded', () => {

    const startButton = document.querySelector('.start-button');
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const tipTextElement = document.getElementById('tip-text');

    const pokemonFunFacts = [
        "Pikachu puede generar poderosas descargas eléctricas desde las bolsas en sus mejillas.",
        "El nombre de Articuno, Zapdos y Moltres contiene los números uno, dos y tres en español.",
        "Rhydon fue el primer Pokémon en ser diseñado por los creadores.",
        "Se dice que el caparazón de un Wobbuffet es indestructible.",
        "El Pokémon Ditto es capaz de transformarse en cualquier otro Pokémon que vea.",
        "Poliwag y sus evoluciones están basados en el ciclo de vida de los renacuajos.",
        "El fantasma que se ve en la Torre Pokémon de Pueblo Lavanda es en realidad un Marowak.",
        "Azurill es el único Pokémon que tiene la posibilidad de cambiar de género al evolucionar.",
        "La Pokédex a menudo contiene descripciones sorprendentemente oscuras sobre los Pokémon.",
        "Los bigotes de un Magikarp son un signo de su increíble fuerza y vitalidad."
    ];

    startButton.addEventListener('click', (event) => {
        event.preventDefault();
        loadingScreen.style.display = 'flex';

        const randomImageNumber = Math.floor(Math.random() * 10) + 1;
        // ¡RUTA CORREGIDA! El JS está en /js pero el CSS es quien necesita la ruta corregida.
        // La ruta en JS se calcula desde el HTML, así que 'img/...' está bien.
        // La corrección clave estaba en el CSS.
        loadingScreen.style.backgroundImage = `url('img/cargando${randomImageNumber}.png')`;

        const randomIndex = Math.floor(Math.random() * pokemonFunFacts.length);
        tipTextElement.textContent = `Dato Curioso: ${pokemonFunFacts[randomIndex]}`;

        const randomDuration = Math.random() * 4000 + 3000;

        let progress = 0;
        const intervalTime = 50;
        const progressInterval = setInterval(() => {
            progress += (intervalTime / randomDuration) * 100;
            progressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(progressInterval);
            }
        }, intervalTime);

        setTimeout(() => {
            window.location.href = startButton.href;
        }, randomDuration);
    });
});