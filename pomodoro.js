let isBreak = false;
let myInterval;
const modeBtns = document.querySelectorAll('.mode-btns');
const startBtn = document.querySelector('#start-timer');
const resumeBtn = document.querySelector('#resume-timer');
const pauseBtn = document.querySelector('#pause-timer');

const timer = {
  pomodoro: 25,
  break: 5,
};

startBtn.addEventListener('click', e => {
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'block';

  const { mode } = e.target.dataset;
  if (mode === 'start') {
    startTimer();
  }
});

pauseBtn.addEventListener('click', e => {
  resumeBtn.style.display = 'block';
  pauseBtn.style.display = 'none';

  const { mode } = e.target.dataset;
  if (mode === 'pause') {
    pauseTimer();
  }
});

resumeBtn.addEventListener('click', resumeTimer);

modeBtns.forEach(btn => {
  btn.addEventListener('click', handleMode);
});

document.addEventListener('load', switchMode('pomodoro'));

function handleMode(e) {
  const { mode } = e.target.dataset;

  if (!mode) {
    return;
  } else {
    switchMode(mode);
  }
}

function switchMode(mode) {
  timer.mode = mode;
  timer.minutes = timer[mode];
  timer.seconds = 0;

  modeBtns.forEach(btn => {
    btn.classList.remove('active');
  });

  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

  clearInterval(myInterval);
  updateClock();
}

function updateClock() {
  const minutes = `${timer.minutes}`.padStart(2, '0');
  const seconds = `${timer.seconds}`.padStart(2, '0');

  const minEl = document.querySelector('#minutes');
  const secEl = document.querySelector('#seconds');
  minEl.textContent = minutes;
  secEl.textContent = seconds;
}

function startTimer() {
  timer.seconds = 59;
  timer.minutes = timer.minutes - 1;

  myInterval = setInterval(timerFunction, 1000);
}

function timerFunction() {
  timer.seconds = timer.seconds - 1;

  if (timer.seconds < 0) {
    timer.minutes = timer.minutes - 1;
    timer.seconds = 59;
  }

  if (timer.minutes < 0) {
    timer.minutes = 0;
    timer.seconds = 0;
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'block';
  }

  updateClock();
}

function pauseTimer() {
  clearInterval(myInterval);
}

function resumeTimer() {
  resumeBtn.style.display = 'none';
  pauseBtn.style.display = 'block';

  myInterval = setInterval(timerFunction, 1000);
}
