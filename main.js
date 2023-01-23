const timeEl = document.querySelector('#time');
const currentDate = new Date();
const hour = new Date().getHours();
const isDayTime = hour >= 6 && hour <= 19 ? true : false;

document.querySelector('#date').textContent = currentDate.toDateString();

setInterval(
  () =>
    (timeEl.textContent = new Date().toLocaleTimeString('en-us', {
      timeStyle: 'short',
    })),
  1000
);

// to-do list functionality:
let toDoInput = document.querySelector('.to-do-input');
let clearItemsBtn = document.querySelector('#clear-completed');
let itemsLeft = 0;

toDoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addToDoItem();
    toDoInput.value = '';
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
    let toDoItem = toDoInput.value;

    itemsLeft++;
    document.querySelector('#items-left').textContent =
      itemsLeft + ' items left';

    displayItems(toDoItem);
  }

  function removeItems() {}
});

getZenQuote();
