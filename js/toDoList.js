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

// clearItemsBtn.addEventListener('click', removeItems);
