# Домашнее задание AHJ DOM

## Loading and Sorting, data-attributes + Advanced

[![build](https://github.com/sergetfep/ahj-dom-loading-sorting/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/sergetfep/ahj-dom-loading-sorting/actions/workflows/deploy.yml)

GitHub Pages: https://sergetfep.github.io/ahj-dom-loading-sorting/

### Что сделано

- данные фильмов выводятся в таблицу;
- значения для сортировки хранятся в `data-*` атрибутах строк;
- сортировка меняется каждые 2 секунды;
- порядок полей: `id`, `title`, `year`, `imdb`;
- для каждого поля есть сортировка по возрастанию и убыванию;
- сортировка идёт по данным из DOM;
- добавлена Advanced-часть: DOM не пересобирается целиком, строки переставляются на свои места через сравнение текущего порядка и отсортированного массива.

### Команды

#### Запуск

```bash
npm install
npm start
```

#### Прочее

```bash
npm run build
npm test
npm run lint
```

### Ссылка на задание

https://github.com/netology-code/ahj-homeworks/tree/AHJ-50/dom
