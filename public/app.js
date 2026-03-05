const input = document.getElementById('search');
const btn = document.getElementById('btnSearch');
const resultsEl = document.getElementById('results');
const statusEl = document.getElementById('status');

function render(items) {
  if (!items || items.length === 0) {
    resultsEl.innerHTML = '<p class="no-results">No se encontraron resultados. Intenta otros términos.</p>';
    return;
  }
  resultsEl.innerHTML = items
    .map(
      (it) =>
        `<div class="item"><h3>${escapeHtml(it.name)}</h3><p>${escapeHtml(it.description)}</p><p class="skills">${escapeHtml(it.skills.join(', '))}</p></div>`
    )
    .join('');
}

function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function doSearch(q) {
  statusEl.textContent = 'Buscando...';
  try {
    const res = await fetch('/api/search?q=' + encodeURIComponent(q));
    const data = await res.json();
    render(data);
  } catch (e) {
    resultsEl.innerHTML = '<p class="no-results">Ocurrió un error al buscar.</p>';
  } finally {
    statusEl.textContent = '';
  }
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

const debouncedSearch = debounce((v) => doSearch(v), 300);

input.addEventListener('input', (e) => {
  const v = e.target.value;
  debouncedSearch(v);
});
btn.addEventListener('click', () => doSearch(input.value));
window.addEventListener('DOMContentLoaded', () => doSearch(''));
