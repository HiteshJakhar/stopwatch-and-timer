var stopwatchInterval;
var stopwatchDisplay = document.getElementById("stopwatchDisplay");
var stopwatchStartTime;
var stopwatchElapsedTime = 0;
var stopwatchIsRunning = false;

var timerInterval;
var timerDisplay = document.getElementById("timerDisplay");
var timerHoursInput = document.getElementById("hours");
var timerMinutesInput = document.getElementById("minutes");
var timerSecondsInput = document.getElementById("seconds");
var timerEndTime;
var timerElapsedTime = 0;
var timerIsRunning = false;

function formatTime(milliseconds) {
  var hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;
  var minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;
  var seconds = Math.floor(milliseconds / 1000);
  milliseconds %= 1000;

  return (
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds)
  );
}

function updateStopwatchDisplay() {
  stopwatchDisplay.innerHTML = formatTime(stopwatchElapsedTime);
}

function startStopwatch() {
  if (!stopwatchIsRunning) {
    stopwatchStartTime = Date.now() - stopwatchElapsedTime;
    stopwatchInterval = setInterval(function () {
      stopwatchElapsedTime = Date.now() - stopwatchStartTime;
      updateStopwatchDisplay();
    }, 10);
    stopwatchIsRunning = true;
  }
}

function stopStopwatch() {
  if (stopwatchIsRunning) {
    clearInterval(stopwatchInterval);
    stopwatchIsRunning = false;
  }
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchElapsedTime = 0;
  updateStopwatchDisplay();
}

function updateTimerDisplay() {
  timerDisplay.innerHTML = formatTime(timerElapsedTime);
}

function startTimer() {
  if (!timerIsRunning) {
    var hours = parseInt(timerHoursInput.value) || 0;
    var minutes = parseInt(timerMinutesInput.value) || 0;
    var seconds = parseInt(timerSecondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please enter a valid time.");
      return;
    }

    timerEndTime =
      Date.now() + hours * 3600000 + minutes * 60000 + seconds * 1000;

    timerInterval = setInterval(function () {
      timerElapsedTime = timerEndTime - Date.now();

      if (timerElapsedTime <= 0) {
        clearInterval(timerInterval);
        timerIsRunning = false;
        timerElapsedTime = 0;
        updateTimerDisplay();
        alert("Timer finished!");
        return;
      }

      updateTimerDisplay();
    }, 10);
    timerIsRunning = true;
  }
}

function stopTimer() {
  if (timerIsRunning) {
    clearInterval(timerInterval);
    timerIsRunning = false;
  }
}

function resetTimer() {
  stopTimer();
  timerHoursInput.value = "";
  timerMinutesInput.value = "";
  timerSecondsInput.value = "";
  timerElapsedTime = 0;
  updateTimerDisplay();
}