import { state, setState } from '../state/store.js';
import { getPokemonPage, getPokemonDetails, getTypePokemonNames } from '../services/pokeapi.js';
import { renderCards, wireCardClicks, updatePagination, openDetailsModal } from '../ui/render.js';
import { getFavorites } from './favorites.js';

export async function loadList() {
  const results = document.getElementById('results');
  results.innerHTML = `<div class="col-12 py-5 text-center text-muted">Cargando…</div>`;

  try {
    let details = [];
    
    if (state.mode === 'type' && state.selectedType !== 'all') {
      // por tipo
      if (!state.typeNames.length) {
        state.typeNames = await getTypePokemonNames(state.selectedType);
      }
      setState({ total: state.typeNames.length });
      const start = (state.currentPage - 1) * state.pageSize;
      const slice = state.typeNames.slice(start, start + state.pageSize);
      details = await Promise.all(slice.map(n => getPokemonDetails(n)));
    } else if (state.mode === 'favorites') {
      // solo favoritos
      const favorites = Array.from(getFavorites().values());
      setState({ total: favorites.length });
      const start = (state.currentPage - 1) * state.pageSize;
      details = favorites.slice(start, start + state.pageSize);
    } else {
      // todos
      const offset = (state.currentPage - 1) * state.pageSize;
      const { count, details: pageDetails } = await getPokemonPage(state.pageSize, offset);
      setState({ total: count });
      details = pageDetails;
    }
    
    // Guardar en caché para el modal
    setState({ pokemons: details });
    
    renderCards(details);
    wireCardClicks(async (name) => openDetailsModal(details.find(p => p.name === name)));
    updatePagination();
  } catch (e) {
    console.error(e);
    results.innerHTML = `<div class="col-12 py-5 text-center text-danger">No se pudo cargar el listado</div>`;
  }
}
