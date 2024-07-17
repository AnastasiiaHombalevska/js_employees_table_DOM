'use strict';

// додати сортування у зворотньому порядку
const table = document.querySelector('table');
const header = document.querySelector('thead');
const titles = header.querySelectorAll('th');
const tableBody = document.querySelector('tbody');

const SALARY_CELL = Array.from(titles).findIndex(
  (title) => title.textContent.trim().toLowerCase() === 'salary',
);

titles.forEach((title, index) => {
  title.addEventListener('click', () => sortsData(index));
});

function sortsData(columnNumber) {
  const sortingData = Array.from(tableBody.querySelectorAll('tr'));
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

  sortedData.forEach((row) => tableBody.appendChild(row));
}

tableBody.addEventListener('click', (e) => {
  const rows = tableBody.querySelectorAll('tr');
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

const form = document.createElement('form');
form.className = 'new-employee-form';

for (const title of titles) {
  const label = document.createElement('label');
  const value = title.textContent.trim().toLowerCase();
  label.textContent = value[0].toUpperCase() + value.slice(1) + ': ';

  const input = document.createElement('input');
  input.setAttribute('name', 'name');

  if (value === 'age' || value === 'salary') {
    input.setAttribute('type', 'number');
  } else {
    input.setAttribute('type', 'text');
  }

  input.setAttribute('data-qa', value);
  input.setAttribute('placeholder', 'Enter ' + value);
  input.setAttribute('required', '');

  label.insertAdjacentElement('beforeend', input);

  form.appendChild(label);
}

const select = document.createElement('select');
select.setAttribute('required', '');
const optionValues = ['', 'Tokyo', 'Singapore', 'London', 'New York', 'Edinburgh', 'San Francisco'];

for (let i = 0; i < optionValues.length; i++) {
  const option = document.createElement('option');
  // if (i === 0) {
  //   option.setAttribute('disabled', '')
  // }
  option.setAttribute('value', optionValues[i].toLowerCase());
  option.textContent = optionValues[i];

  select.appendChild(option);
}

form.appendChild(select);

const submitBtn = document.createElement('button');
submitBtn.setAttribute('type', 'submit');
submitBtn.textContent = 'Save to tableBody';
form.appendChild(submitBtn);

table.insertAdjacentElement('afterend', form);

form.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.preventDefault();
  }
});

// показати повідомлення, якщо дані не валідні
// 4. Show notification if form data is invalid
// (use notification from the previous tasks).

// додати редагування комірок при подвійному кліку
// 5. Implement editing of tableBody cells by double-clicking on it. (optional)
