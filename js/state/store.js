// Estado global muy simple + suscripción
const listeners = new Set();

export const state = {
  mode: 'all',          // 'all' | 'type' | 'search'
  selectedType: 'all',
  currentPage: 1,
  pageSize: 12,
  total: 0,
  typeNames: [],        // nombres cuando hay filtro por tipo
};

export function setState(patch) {
  Object.assign(state, patch);
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const selectors = {
  totalPages: () => Math.max(1, Math.ceil(state.total / state.pageSize)),
};
