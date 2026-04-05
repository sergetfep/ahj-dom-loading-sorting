export const sortSequence = [
  { field: "id", direction: "asc" },
  { field: "id", direction: "desc" },
  { field: "title", direction: "asc" },
  { field: "title", direction: "desc" },
  { field: "year", direction: "asc" },
  { field: "year", direction: "desc" },
  { field: "imdb", direction: "asc" },
  { field: "imdb", direction: "desc" },
];

export function formatImdb(value) {
  return Number(value).toFixed(2);
}

export function getComparableValue(row, field) {
  if (field === "title") {
    return row.dataset[field].toLowerCase();
  }

  return Number(row.dataset[field]);
}

export function compareRows(first, second, field, direction) {
  const firstValue = getComparableValue(first, field);
  const secondValue = getComparableValue(second, field);

  let result = 0;

  if (field === "title") {
    if (firstValue > secondValue) {
      result = 1;
    }

    if (firstValue < secondValue) {
      result = -1;
    }
  } else {
    result = firstValue - secondValue;
  }

  if (direction === "desc") {
    result *= -1;
  }

  return result;
}
