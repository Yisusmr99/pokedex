// Todas las llamadas a PokeAPI + caché simple
export const API = 'https://pokeapi.co/api/v2';

const cache = new Map(); // name -> details

export async function getTypes(signal) {
  const r = await fetch(`${API}/type?limit=50`, { signal });
  if (!r.ok) throw new Error('types-failed');
  const data = await r.json();
  return data.results.filter(t => !['shadow', 'unknown'].includes(t.name));
}

export async function getPokemonDetails(nameOrUrl, signal) {
  const key = (nameOrUrl.name || nameOrUrl).toString().toLowerCase();
  if (cache.has(key)) return cache.get(key);
  const url = nameOrUrl.url ? nameOrUrl.url : `${API}/pokemon/${key}`;
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error('pokemon-not-found');
  const data = await r.json();
  cache.set(key, data);
  return data;
}

export async function getPokemonPage(limit, offset, signal) {
  const r = await fetch(`${API}/pokemon?limit=${limit}&offset=${offset}`, { signal });
  const data = await r.json();
  const details = await Promise.all(
    data.results.map(item => getPokemonDetails(item, signal))
  );
  return { count: data.count, details };
}

export async function getTypePokemonNames(type, signal) {
  const r = await fetch(`${API}/type/${type}`, { signal });
  const data = await r.json();
  return data.pokemon.map(x => x.pokemon.name);
}
