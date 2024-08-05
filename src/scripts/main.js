'use strict';

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

let reverseOrder = false;

function sortsData(columnNumber) {
  const sortingData = Array.from(tableBody.querySelectorAll('tr'));

  const sortedData = sortingData.sort((item1, item2) => {
    const cell1 = item1.querySelectorAll('td')[columnNumber].textContent.trim();
    const cell2 = item2.querySelectorAll('td')[columnNumber].textContent.trim();

    const isNumeric = !isNaN(cell1) && !isNaN(cell2);

    if (columnNumber === SALARY_CELL) {
      return parseFloat(cell1.slice(1)) - parseFloat(cell2.slice(1));
    } else if (isNumeric) {
      return parseFloat(cell1) - parseFloat(cell2);
    } else {
      return cell1.localeCompare(cell2);
    }
  });

  if (reverseOrder) {
    sortedData.reverse();
  }

  sortedData.forEach((row) => tableBody.appendChild(row));

  reverseOrder = !reverseOrder;
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

const form = document.createElement('form');

form.className = 'new-employee-form';

for (const title of titles) {
  const label = document.createElement('label');
  const value = title.textContent.trim().toLowerCase();

  label.textContent = value[0].toUpperCase() + value.slice(1) + ': ';

  if (value === 'office') {
    const select = document.createElement('select');

    select.setAttribute('required', '');
    select.setAttribute('data-qa', value);
    select.setAttribute('name', value);

    const optionOffice = [
      'Tokyo',
      'Singapore',
      'London',
      'New York',
      'Edinburgh',
      'San Francisco',
    ];

    for (const city of optionOffice) {
      const option = document.createElement('option');

      option.setAttribute('value', city.toLowerCase());
      option.textContent = city;

      select.appendChild(option);
    }

    label.appendChild(select);
  } else {
    const input = document.createElement('input');

    input.setAttribute('name', value);

    if (value === 'age' || value === 'salary') {
      input.setAttribute('type', 'number');
    } else {
      input.setAttribute('type', 'text');
    }

    input.setAttribute('data-qa', value);
    input.setAttribute('placeholder', 'Enter ' + value);
    input.setAttribute('required', '');

    label.appendChild(input);
  }

  form.appendChild(label);
}

const submitBtn = document.createElement('button');

submitBtn.setAttribute('type', 'submit');
submitBtn.textContent = 'Save to table';
form.appendChild(submitBtn);

table.insertAdjacentElement('afterend', form);

const formData = {
  name: '',
  position: '',
  office: '',
  age: '',
  salary: '',
};

const showNotification = (type) => {
  const notification = document.createElement('div');
  const title = document.createElement('h1');
  const desc = document.createElement('p');

  notification.style.top = 10 + 'px';
  notification.style.right = 10 + 'px';

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('notification');
  // notification.classList.add(type);

  title.textContent = `${type} message`;
  desc.textContent = `${type === 'success' ? 'Employee added to table' : 'Add valid data'}`;

  notification.append(title, desc);
  notification.style.display = 'block';

  // setTimeout(() => {
  //   notification.style.display = 'none';
  // }, 3000);
};

form.querySelectorAll('input').forEach((input) => {
  input.addEventListener('input', (e) => {
    const value =
      e.target.type === 'number'
        ? parseFloat(e.target.value)
        : e.target.value.trim();

    if (e.target.name === 'salary') {
      formData[e.target.name] = '$' + value;
    }

    if (e.target.name === 'age') {
      formData[e.target.name] =
        value >= 18 <= 90 ? value : showNotification('error');
    }
  });
});

form.querySelector('select').addEventListener('change', (e) => {
  formData[e.target.name] = e.target.value;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const allFieldsFilled = Object.values(formData).every(
    (value) => value !== '',
  );

  if (allFieldsFilled) {
    const row = document.createElement('tr');

    Object.values(formData).forEach((data) => {
      const cell = document.createElement('td');

      cell.innerText = data;
      row.appendChild(cell);
    });

    // row.classList.add('success');

    tableBody.appendChild(row);
    form.reset();

    Object.keys(formData).forEach((key) => (formData[key] = ''));

    showNotification('success');
  } else {
    showNotification('error');
  }
});

// додати редагування комірок при подвійному кліку
// 5. Implement editing of tableBody cells by double-clicking on it. (optional)
