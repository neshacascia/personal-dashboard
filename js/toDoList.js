let input = document.querySelector('.to-do-input');
const message = document.querySelector('#message');
let tasks = document.querySelector('#to-do-list');
const deleteBtn = document.querySelector('#delete');
const clearItemsBtn = document.querySelector('#clear-completed');
let data = [];

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();

    formValidation();
  }
});

(() => {
  data = JSON.parse(localStorage.getItem('data')) || [];
  console.log(data);
  displayTasks();
})();

function formValidation() {
  if (input.value === '') {
    message.innerText = 'Task cannot be blank';
    return;
  } else {
    message.innerText = '';
    acceptData();
    input.value = '';
  }
}

function acceptData() {
  data.push({
    task: input.value,
  });

  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);

  displayTasks();
}

function displayTasks() {
  tasks.innerHTML = '';
  data.map((item, ind) => {
    return (tasks.innerHTML += `
    <li class="to-do-item" id=${ind}>
    <div class="checkbox-container">
      <input id="delete" class="checkbox" type="checkbox" onClick="deleteTask(this)" />
    </div>
    <p class="to-do" >${item.task}</p>
  </li>`);
  });

  document.querySelector('#items-left').textContent =
    data.length + ' items left';
}

function deleteTask(e) {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem('data', JSON.stringify(data));
  console.log(data);

  document.querySelector('#items-left').textContent =
    data.length + ' items left';
}
