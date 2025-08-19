// Gestión de favoritos usando localStorage
const STORAGE_KEY = 'pokemon_favorites';

export function getFavorites() {
  try {
    const favoritesData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return new Map(Object.entries(favoritesData));
  } catch {
    return new Map();
  }
}

export function toggleFavorite(pokemon) {
  const favorites = getFavorites();
  if (favorites.has(pokemon.name)) {
    favorites.delete(pokemon.name);
  } else {
    favorites.set(pokemon.name, pokemon);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(favorites)));
  return favorites.has(pokemon.name);
}

export function isFavorite(pokemonName) {
  return getFavorites().has(pokemonName);
}

// Actualiza el botón de favoritos según el estado
export function updateFavoriteButton(pokemon) {
  const btn = document.getElementById('favButton');
  const isFav = isFavorite(pokemon.name);
  
  btn.classList.toggle('active', isFav);
  btn.querySelector('i').className = `bi bi-star${isFav ? '-fill' : ''}`;
  btn.querySelector('span').textContent = isFav ? 'Quitar de favoritos' : 'Agregar a favoritos';
}
