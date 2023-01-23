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
