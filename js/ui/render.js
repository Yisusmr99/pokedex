import { state, setState, selectors } from '../state/store.js';

const $ = (id) => document.getElementById(id);

export function imgFromSprites(s) {
  return (
    s?.other?.['official-artwork']?.front_default ||
    s?.other?.dream_world?.front_default ||
    s?.front_default || ''
  );
}
export const titleCase = (s) => s.replace(/\b\w/g, c => c.toUpperCase());
const toKg = (hg) => (hg / 10).toFixed(1) + ' kg';
const toM  = (dm) => (dm / 10).toFixed(1) + ' m';

let onChangePage = () => {};
export function setOnChangePage(fn) { onChangePage = fn; }

export function renderCards(pokemons) {
  const el = $('results'); el.innerHTML = '';
  if (!pokemons.length) {
    el.innerHTML = `<div class="col-12 text-center text-muted py-5">Sin resultados</div>`;
    return;
  }
  for (const p of pokemons) {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    const types = p.types.map(t =>
      `<span class="badge rounded-pill me-1" style="background:var(--type-${t.type.name});">${t.type.name.toUpperCase()}</span>`
    ).join('');
    col.innerHTML = `
      <div class="card h-100 shadow-sm pokemon-card" data-name="${p.name}" style="cursor:pointer;">
        <div class="ratio ratio-1x1 bg-light">
          <img src="${imgFromSprites(p.sprites)}" class="card-img-top p-3 object-fit-contain" alt="${p.name}"/>
        </div>
        <div class="card-body">
          <h6 class="card-title mb-2">${titleCase(p.name)} <span class="text-muted">#${p.id}</span></h6>
          <div>${types}</div>
        </div>
      </div>`;
    el.appendChild(col);
  }
}

export function wireCardClicks(handler) {
  $('results').querySelectorAll('.pokemon-card').forEach(card => {
    card.addEventListener('click', () => handler(card.getAttribute('data-name')));
  });
}

export function updatePagination({ hide = false } = {}) {
  const prev = $('prev-page'), next = $('next-page'), info = $('page-info');
  const totalPages = selectors.totalPages();
  info.textContent = `Pág. ${state.currentPage} de ${totalPages}`;
  prev.disabled = state.currentPage <= 1;
  next.disabled = state.currentPage >= totalPages;
  $('pagination').style.visibility = hide ? 'hidden' : 'visible';

  prev.onclick = () => { if (state.currentPage > 1) { setState({ currentPage: state.currentPage - 1 }); onChangePage(); window.scrollTo({top:0,behavior:'smooth'}); } };
  next.onclick = () => { if (state.currentPage < totalPages) { setState({ currentPage: state.currentPage + 1 }); onChangePage(); window.scrollTo({top:0,behavior:'smooth'}); } };
}

export function openDetailsModal(p) {
  document.getElementById('modalTitle').textContent = `${titleCase(p.name)}  #${p.id}`;
  document.getElementById('modalImg').src = imgFromSprites(p.sprites);
  document.getElementById('modalHeight').textContent = toM(p.height);
  document.getElementById('modalWeight').textContent = toKg(p.weight);

  document.getElementById('modalTypes').innerHTML = p.types.map(t =>
    `<span class="badge rounded-pill" style="background:var(--type-${t.type.name});">${t.type.name.toUpperCase()}</span>`
  ).join(' ');

  document.getElementById('modalAbilities').innerHTML = p.abilities.map(a =>
    `<span class="badge text-bg-light border">${titleCase(a.ability.name)}</span>`
  ).join(' ');

  document.getElementById('modalStats').innerHTML = p.stats.map(s => {
    const v = s.base_stat, name = titleCase(s.stat.name);
    return `
      <div>
        <div class="d-flex justify-content-between small"><span>${name}</span><span class="text-muted">${v}</span></div>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="255" aria-valuenow="${v}">
          <div class="progress-bar" style="width:${Math.min(100,(v/255)*100)}%"></div>
        </div>
      </div>`;
  }).join('');

  const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
  modal.show();
}
