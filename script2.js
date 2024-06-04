let startTime;
let lapTime;
let isRunning = false;
let lapCounter = 1;

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById("startStop").innerHTML = "Start";
    isRunning = false;
  } else {
    startTime = new Date().getTime();
    lapTime = startTime;
    interval = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerHTML = "Stop";
    isRunning = true;
  }
}

function reset() {
  clearInterval(interval);
  document.getElementById("display").innerHTML = "00:00:00.000";
  document.getElementById("startStop").innerHTML = "Start";
  document.getElementById("laps").innerHTML = "";
  isRunning = false;
  lapCounter = 1;
}

function recordLap() {
  if (isRunning) {
    let lap = new Date().getTime() - lapTime;
    lapTime = new Date().getTime();
    let minutes = Math.floor(lap / 60000);
    let seconds = Math.floor((lap % 60000) / 1000);
    let milliseconds = lap % 1000;
    let lapString =
      padZero(minutes) +
      ":" +
      padZero(seconds) +
      "." +
      padZero(milliseconds, 3);
    let lapItem = document.createElement("li");
    lapItem.innerHTML = "Lap " + lapCounter + ": " + lapString;
    document.getElementById("laps").appendChild(lapItem);
    lapCounter++;
  }
}

function updateDisplay() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);
  let milliseconds = elapsedTime % 1000;
  document.getElementById("display").innerHTML =
    padZero(minutes) + ":" + padZero(seconds) + "." + padZero(milliseconds, 3);

  // Dynamically change background color based on elapsed time
  let hue = (elapsedTime / 10) % 360; // Change color every 10 seconds
  document.body.style.backgroundColor = `hsl(${hue}, 50%, 80%)`;
}

function padZero(num, size = 2) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
