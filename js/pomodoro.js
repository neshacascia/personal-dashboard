let breakCount = 0;
let myInterval;
const modeBtns = document.querySelectorAll('.mode-btns');
const startBtn = document.querySelector('#start-timer');
const resumeBtn = document.querySelector('#resume-timer');
const pauseBtn = document.querySelector('#pause-timer');
const alarm = document.createElement('audio');
alarm.setAttribute(
  'src',
  'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
);

const timer = {
  pomodoro: 25,
  break: 5,
  longBreak: 15,
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
    if (timer.minutes < 0) {
      if (breakCount > 5) {
        timer.minutes = timer.longBreak - 1;
        breakCount = 0;
        document.querySelector('#work').classList.remove('active');
        document.querySelector('#break').classList.add('active');
      } else if (breakCount % 2 === 0) {
        alarm.play();
        timer.minutes = timer.break - 1;
        breakCount++;
        document.querySelector('#work').classList.remove('active');
        document.querySelector('#break').classList.add('active');
      } else {
        alarm.play();
        timer.minutes = timer.pomodoro - 1;
        breakCount++;

        document.querySelector('#break').classList.remove('active');
        document.querySelector('#work').classList.add('active');
      }
    }
    timer.seconds = 59;
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
