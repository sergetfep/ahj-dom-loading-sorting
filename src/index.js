import './style.css';
import { movies } from './data';
import { compareRows, formatImdb, sortSequence } from './sort';

function createHeaderCell(title, field) {
  const th = document.createElement('th');
  th.className = 'movies-table__header';
  th.dataset.field = field;

  const label = document.createElement('span');
  label.className = 'movies-table__label';
  label.textContent = title;

  const arrow = document.createElement('span');
  arrow.className = 'movies-table__arrow';

  th.append(label, arrow);

  return th;
}

function createCell(value) {
  const td = document.createElement('td');
  td.textContent = value;
  return td;
}

function createRow(movie) {
  const row = document.createElement('tr');
  row.className = 'movies-table__row';

  row.dataset.id = String(movie.id);
  row.dataset.title = movie.title;
  row.dataset.year = String(movie.year);
  row.dataset.imdb = formatImdb(movie.imdb);

  row.append(
    createCell(`#${movie.id}`),
    createCell(movie.title),
    createCell(`(${movie.year})`),
    createCell(`imdb: ${formatImdb(movie.imdb)}`),
  );

  return row;
}

function createTable() {
  const table = document.createElement('table');
  table.className = 'movies-table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  headRow.append(
    createHeaderCell('id', 'id'),
    createHeaderCell('title', 'title'),
    createHeaderCell('year', 'year'),
    createHeaderCell('imdb', 'imdb'),
  );

  thead.append(headRow);

  const tbody = document.createElement('tbody');

  movies.forEach((movie) => {
    tbody.append(createRow(movie));
  });

  table.append(thead, tbody);

  return { table, tbody };
}

function updateHeaders(table, field, direction) {
  const headers = Array.from(table.querySelectorAll('.movies-table__header'));

  headers.forEach((header) => {
    const arrow = header.querySelector('.movies-table__arrow');

    header.classList.remove('movies-table__header_active');
    arrow.textContent = '';

    if (header.dataset.field === field) {
      header.classList.add('movies-table__header_active');
      arrow.textContent = direction === 'asc' ? '▲' : '▼';
    }
  });
}

function sortRows(tbody, field, direction) {
  const rows = Array.from(tbody.querySelectorAll('.movies-table__row'));

  rows.sort((a, b) => compareRows(a, b, field, direction));

  tbody.replaceChildren(...rows);
}

function init() {
  const app = document.querySelector('#app');

  if (!app) {
    return;
  }

  const title = document.createElement('h1');
  title.textContent = 'Loading and Sorting';

  const { table, tbody } = createTable();

  app.append(title, table);

  let currentIndex = 0;

  setInterval(() => {
    const currentSort = sortSequence[currentIndex];

    sortRows(tbody, currentSort.field, currentSort.direction);
    updateHeaders(table, currentSort.field, currentSort.direction);

    currentIndex += 1;

    if (currentIndex === sortSequence.length) {
      currentIndex = 0;
    }
  }, 2000);
}

init();
