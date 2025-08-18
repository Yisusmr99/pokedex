import { state, setState } from '../state/store.js';
import { getPokemonPage, getPokemonDetails, getTypePokemonNames } from '../services/pokeapi.js';
import { renderCards, wireCardClicks, updatePagination, openDetailsModal } from '../ui/render.js';

export async function loadList() {
  const results = document.getElementById('results');
  results.innerHTML = `<div class="col-12 py-5 text-center text-muted">Cargando…</div>`;

  try {
    if (state.mode === 'type' && state.selectedType !== 'all') {
      // por tipo
      if (!state.typeNames.length) {
        state.typeNames = await getTypePokemonNames(state.selectedType);
      }
      setState({ total: state.typeNames.length });
      const start = (state.currentPage - 1) * state.pageSize;
      const slice = state.typeNames.slice(start, start + state.pageSize);
      const details = await Promise.all(slice.map(n => getPokemonDetails(n)));
      renderCards(details);
      wireCardClicks(async (name) => openDetailsModal(await getPokemonDetails(name)));
      updatePagination();
    } else {
      // todos
      const offset = (state.currentPage - 1) * state.pageSize;
      const { count, details } = await getPokemonPage(state.pageSize, offset);
      setState({ total: count });
      renderCards(details);
      wireCardClicks(async (name) => openDetailsModal(await getPokemonDetails(name)));
      updatePagination();
    }
  } catch (e) {
    console.error(e);
    results.innerHTML = `<div class="col-12 py-5 text-center text-danger">No se pudo cargar el listado</div>`;
  }
}
