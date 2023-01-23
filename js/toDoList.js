let input = document.querySelector('.to-do-input');
let message = document.querySelector('#message');
let clearItemsBtn = document.querySelector('#clear-completed');
let itemsLeft = 0;
let data = {};

input.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();

    formValidation();
  }

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
    data['text'] = input.value;
    console.log(data);
  }

  clearItemsBtn.addEventListener('click', removeItems);

  function displayItems(toDoItem) {
    document.querySelector('#to-do-list').innerHTML += `
      <li class="to-do-item">
        <div class="checkbox-container">
          <button id="completed" class="checkbox" type="button"></button>
        </div>
        <p class="to-do">${toDoItem}</p>
      </li>`;
  }

  function addToDoItem() {
    let toDoItem = input.value;

    itemsLeft++;
    document.querySelector('#items-left').textContent =
      itemsLeft + ' items left';

    displayItems(toDoItem);
  }

  function removeItems() {}
});
