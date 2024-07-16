'use strict';

// write code here
// додати кнопки на th
// 1. Implement table sorting by clicking on the title (in two directions).
const header = document.querySelector('thead');
const titles = header.querySelectorAll('th');

const SALARY_CELL = Array.from(titles).findIndex(
  (title) => title.textContent.trim().toLowerCase() === 'salary',
);

titles.forEach((title, index) => {
  title.addEventListener('click', () => sortsData(index));
});

function sortsData(columnNumber) {
  const table = document.querySelector('tbody');
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

// додати форму, що дозволяє додавати новий робітників до таблиці
// 3. Write a script to add a form to the document
// Form allows users to add new employees to the spreadsheet.

// показати повідомлення, якщо дані не валідні
// 4. Show notification if form data is invalid
// (use notification from the previous tasks).

// додати редагування комірок при подвійному кліку
// 5. Implement editing of table cells by double-clicking on it. (optional)
