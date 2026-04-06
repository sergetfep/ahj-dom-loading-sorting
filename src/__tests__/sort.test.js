import {
  compareRows,
  formatImdb,
  getComparableValue,
  getSortedRows,
  sortSequence,
  syncRowsWithDomOrder,
} from '../sort';

function createRow(data) {
  const row = document.createElement('tr');

  Object.keys(data).forEach((key) => {
    row.dataset[key] = String(data[key]);
  });

  return row;
}

describe('sort helpers', () => {
  test('formatImdb returns string with two digits after point', () => {
    expect(formatImdb(9)).toBe('9.00');
    expect(formatImdb(8.9)).toBe('8.90');
  });

  test('getComparableValue returns number for numeric fields', () => {
    const row = createRow({ id: 25, year: 1972, imdb: '9.20' });

    expect(getComparableValue(row, 'id')).toBe(25);
    expect(getComparableValue(row, 'year')).toBe(1972);
    expect(getComparableValue(row, 'imdb')).toBe(9.2);
  });

  test('getComparableValue returns lowercase string for title', () => {
    const row = createRow({ title: 'Тёмный рыцарь' });

    expect(getComparableValue(row, 'title')).toBe('тёмный рыцарь');
  });

  test('compareRows works for ascending and descending numbers', () => {
    const first = createRow({
      id: 25,
      imdb: '9.20',
      year: 1972,
      title: 'Крёстный отец',
    });
    const second = createRow({
      id: 26,
      imdb: '9.30',
      year: 1994,
      title: 'Побег из Шоушенка',
    });

    expect(compareRows(first, second, 'id', 'asc')).toBeLessThan(0);
    expect(compareRows(first, second, 'id', 'desc')).toBeGreaterThan(0);
  });

  test('compareRows works for ascending and descending strings', () => {
    const first = createRow({ title: 'Криминальное чтиво' });
    const second = createRow({ title: 'Побег из Шоушенка' });

    expect(compareRows(first, second, 'title', 'asc')).toBeLessThan(0);
    expect(compareRows(first, second, 'title', 'desc')).toBeGreaterThan(0);
  });

  test('getSortedRows returns rows in expected order', () => {
    const first = createRow({
      id: 26,
      title: 'Побег из Шоушенка',
      year: 1994,
      imdb: '9.30',
    });
    const second = createRow({
      id: 25,
      title: 'Крёстный отец',
      year: 1972,
      imdb: '9.20',
    });
    const third = createRow({
      id: 1047,
      title: 'Тёмный рыцарь',
      year: 2008,
      imdb: '9.00',
    });

    const sortedRows = getSortedRows([first, second, third], 'id', 'asc');

    expect(sortedRows).toEqual([second, first, third]);
  });

  test('syncRowsWithDomOrder moves existing nodes instead of recreating them', () => {
    const tbody = document.createElement('tbody');
    const first = createRow({ id: 26 });
    const second = createRow({ id: 25 });
    const third = createRow({ id: 1047 });

    tbody.append(first, second, third);

    syncRowsWithDomOrder(tbody, [second, first, third]);

    expect(Array.from(tbody.children)).toEqual([second, first, third]);
    expect(tbody.children[0]).toBe(second);
    expect(tbody.children[1]).toBe(first);
  });

  test('sortSequence contains all steps', () => {
    expect(sortSequence).toEqual([
      { field: 'id', direction: 'asc' },
      { field: 'id', direction: 'desc' },
      { field: 'title', direction: 'asc' },
      { field: 'title', direction: 'desc' },
      { field: 'year', direction: 'asc' },
      { field: 'year', direction: 'desc' },
      { field: 'imdb', direction: 'asc' },
      { field: 'imdb', direction: 'desc' },
    ]);
  });
});
