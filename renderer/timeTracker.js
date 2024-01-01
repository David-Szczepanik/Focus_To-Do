let isTimerRunning = false;
let startTime;
let timerInterval;

function toggleTimer() {
  if (isTimerRunning) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  isTimerRunning = true;
  startTime = new Date().getTime();

  timerInterval = setInterval(updateTimer, 1000);

  document.getElementById('startStopBtn').innerText = 'Stop';
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);

  document.getElementById('startStopBtn').innerText = 'Start';
}

function updateTimer() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;

  const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

  document.getElementById('timer').innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return (number < 10) ? '0' + number : number;
}