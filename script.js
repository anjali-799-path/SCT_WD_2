let timer;
let seconds = 0, minutes = 0, hours = 0;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(updateTime, 1000);
  }
}

function pauseTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
}

function updateTime() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes == 60) {
    minutes = 0;
    hours++;
  }
  
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  
  display.textContent = `${h}:${m}:${s}`;
}

function recordLap() {
  if (running) {
    let li = document.createElement("li");
    li.textContent = display.textContent;
    laps.appendChild(li);
  }
}
