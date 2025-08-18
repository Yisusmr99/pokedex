import { getTypes } from '../services/pokeapi.js';

export async function initTypesBar(containerId, onTypeClick) {
  const ul = document.getElementById(containerId);
  ul.innerHTML = '<li style="text-align:center;padding:1rem;">Cargando tipos…</li>';

  const types = await getTypes();
  ul.innerHTML = '';

  // Botón "VER TODOS"
  ul.appendChild(makeTypeButton({ name: 'all', label: 'VER TODOS', style: '#ececec', text: 'black' }));

  // Tipos
  types.forEach(t => {
    ul.appendChild(makeTypeButton({ name: t.name, label: t.name.toUpperCase(), varName: t.name }));
  });

  // delegación de eventos
  ul.addEventListener('click', (e) => {
    const btn = e.target.closest('.type-button');
    if (!btn) return;
    ul.querySelectorAll('.type-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    onTypeClick(btn.dataset.type);
  });
}

function makeTypeButton({ name, label, style, text = 'white', varName }) {
  const li = document.createElement('li'); li.className = 'nav-item';
  const btn = document.createElement('button');
  btn.className = 'nav-link type-button';
  btn.dataset.type = name;
  btn.textContent = label;
  Object.assign(btn.style, {
    margin: '0.25rem', borderRadius: '1.5rem', minWidth: '5rem',
    textAlign: 'center', border: 'none', padding: '0.5rem 1rem',
    cursor: 'pointer', transition: 'transform 0.2s ease', fontSize: '0.9rem'
  });
  if (style) { btn.style.backgroundColor = style; btn.style.color = text; }
  if (varName) { btn.style.backgroundColor = `var(--type-${varName})`; btn.style.color = 'white'; }
  li.appendChild(btn);
  return li;
}
