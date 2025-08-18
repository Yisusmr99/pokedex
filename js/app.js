import { setState, state } from './state/store.js';
import { initTypesBar } from './ui/typesBar.js';
import { setOnChangePage } from './ui/render.js';
import { loadList } from './features/listing.js';
import { initSearch } from './features/search.js';

document.addEventListener('DOMContentLoaded', async () => {
  // paginación llama a loadList
  setOnChangePage(loadList);

  // barra de tipos
  await initTypesBar('options-types', (type) => {
    const mode = (type === 'all') ? 'all' : 'type';
    setState({ mode, selectedType: type, currentPage: 1, typeNames: [] });
    loadList();
    // limpiar búsqueda visual si había texto
    const input = document.getElementById('search-input'); if (input) input.value = '';
  });

  // búsqueda
  initSearch();
  document.getElementById('search-form').addEventListener('search:clear', () => {
    setState({ mode: 'all', selectedType: 'all', currentPage: 1 });
    loadList();
  });

  // primer render
  await loadList();
});
