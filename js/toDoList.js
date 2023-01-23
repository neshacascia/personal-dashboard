let input = document.querySelector('.to-do-input');
let message = document.querySelector('#message');
let tasks = document.querySelector('#to-do-list');
let clearItemsBtn = document.querySelector('#clear-completed');
let itemsLeft = 0;
let data = [];

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();

    formValidation();
  }
});

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
  itemsLeft++;
  data.map((item, ind) => {
    return (tasks.innerHTML += `
    <li class="to-do-item" id=${ind}>
    <div class="checkbox-container">
      <button id="completed" class="checkbox" type="button"></button>
    </div>
    <p class="to-do">${item.task}</p>
  </li>`);
  });

  document.querySelector('#items-left').textContent = itemsLeft + ' items left';
}

// clearItemsBtn.addEventListener('click', removeItems);
