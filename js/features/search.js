import { setState } from '../state/store.js';
import { getPokemonDetails } from '../services/pokeapi.js';
import { renderCards, wireCardClicks, updatePagination, openDetailsModal } from '../ui/render.js';

export function initSearch() {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim().toLowerCase();

    if (!q) { // vacío -> vuelve al listado principal (lo maneja app.js reiniciando estado)
      form.dispatchEvent(new CustomEvent('search:clear', { bubbles: true }));
      return;
    }

    try {
      const p = await getPokemonDetails(q);
      renderCards([p]);
      wireCardClicks(async (name) => openDetailsModal(await getPokemonDetails(name)));
      setState({ total: 1, currentPage: 1 });
      updatePagination({ hide: true }); // ocultar paginación en resultado único
    } catch {
      const results = document.getElementById('results');
      results.innerHTML = `<div class="col-12 py-5 text-center text-danger">No se encontró "${q}"</div>`;
      setState({ total: 1, currentPage: 1 });
      updatePagination({ hide: true });
    }
  });
}
