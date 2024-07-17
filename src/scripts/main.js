'use strict';

// додати сортування у зворотньому порядку
const header = document.querySelector('thead');
const titles = header.querySelectorAll('th');
const table = document.querySelector('tbody');

const SALARY_CELL = Array.from(titles).findIndex(
  (title) => title.textContent.trim().toLowerCase() === 'salary',
);

titles.forEach((title, index) => {
  title.addEventListener('click', () => sortsData(index));
});

function sortsData(columnNumber) {
  const sortingData = Array.from(table.querySelectorAll('tr'));
  const sortedData = sortingData.sort((item1, item2) => {
    const cell1 = item1.querySelectorAll('td')[columnNumber].textContent.trim();
    const cell2 = item2.querySelectorAll('td')[columnNumber].textContent.trim();

    const isNumeric = !isNaN(cell1) && !isNaN(cell1);

    if (columnNumber === SALARY_CELL) {
      return parseFloat(cell1.slice(1)) - parseFloat(cell2.slice(1));
    } else if (isNumeric) {
      return parseFloat(cell1) - parseFloat(cell2);
    } else {
      return cell1.localeCompare(cell2);
    }
  });

  sortedData.forEach((row) => table.appendChild(row));
}

// додати виділення при кліку на рядок
// 2. When user clicks on a row, it should become selected.

table.addEventListener('click', (e) => {
  const rows = table.querySelectorAll('tr');
  const targetClick = e.target.closest('tr');

  rows.forEach((row) => row.classList.remove('active'));

  if (targetClick.tagName === 'TR') {
    if (targetClick.className) {
      targetClick.classList.add('active');
    } else {
      targetClick.className = 'active';
    }
  }
});

// додати форму, що дозволяє додавати новий робітників до таблиці
// 3. Write a script to add a form to the document
// Form allows users to add new employees to the spreadsheet.

// показати повідомлення, якщо дані не валідні
// 4. Show notification if form data is invalid
// (use notification from the previous tasks).

// додати редагування комірок при подвійному кліку
// 5. Implement editing of table cells by double-clicking on it. (optional)
