import { setState, state } from './state/store.js';
import { initTypesBar } from './ui/typesBar.js';
import { setOnChangePage } from './ui/render.js';
import { loadList } from './features/listing.js';
import { initSearch } from './features/search.js';
import { getFavorites } from './features/favorites.js';

document.addEventListener('DOMContentLoaded', async () => {
  // paginación llama a loadList
  setOnChangePage(loadList);

  // barra de tipos
  await initTypesBar('options-types', (type) => {
    const mode = (type === 'all') ? 'all' : 'type';
    setState({ mode, selectedType: type, currentPage: 1, typeNames: [], showOnlyFavorites: false });
    loadList();
    // limpiar búsqueda visual si había texto
    const input = document.getElementById('search-input'); 
    if (input) input.value = '';
    document.getElementById('show-favorites').checked = false;
  });

  // toggle de favoritos
  document.getElementById('show-favorites').addEventListener('change', (e) => {
    setState({ 
      mode: e.target.checked ? 'favorites' : 'all', 
      currentPage: 1,
      showOnlyFavorites: e.target.checked 
    });
    loadList();
  });

  // búsqueda
  initSearch();
  document.getElementById('search-form').addEventListener('search:clear', () => {
    setState({ mode: 'all', selectedType: 'all', currentPage: 1, showOnlyFavorites: false });
    document.getElementById('show-favorites').checked = false;
    loadList();
  });

  // primer render
  await loadList();
});
