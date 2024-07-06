const playButton = document.getElementsByClassName("play")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];
const clearButton = document.getElementsByClassName("lap-clear-button")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centisecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0]; 

let isPlay = false;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapItem = 0;
let isReset = false;

let minInterval, secInterval, centiInterval;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay) {
        playButton.innerHTML = "Pause";
        bg.classList.add("animation-bg");

        minInterval = setInterval(() => {
            minute.innerHTML = `${String(minCounter).padStart(2, '0')}:`;
            minCounter++;
        }, 60 * 1000);

        secInterval = setInterval(() => {
            if (secCounter === 60) {
                secCounter = 0;
            }
            second.innerHTML = `${String(secCounter).padStart(2, '0')}:`;
            secCounter++;
        }, 1000);

        centiInterval = setInterval(() => {
            if (centiCounter === 100) {
                centiCounter = 0;
            }
            centisecond.innerHTML = `${String(centiCounter).padStart(2, '0')}`;
            centiCounter++;
        }, 10);

        isPlay = true;
        isReset = true;
    } else {
        playButton.innerHTML = "Play";
        clearInterval(minInterval);
        clearInterval(secInterval);
        clearInterval(centiInterval);
        isPlay = false;
        isReset = false;
        bg.classList.remove("animation-bg");
    }
    toggleButton();
};

const reset = () => {
    isReset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    secCounter = 0;
    centiCounter = 0;
    minCounter = 0;
    second.innerHTML = '00:';
    centisecond.innerHTML = '00';
    minute.innerHTML = '00:';
};

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timestamp.setAttribute("class", "time-stamp");

    number.innerText = `#${++lapItem}`;
    timestamp.innerHTML = `${String(minCounter).padStart(2, '0')}:${String(secCounter).padStart(2, '0')}:${String(centiCounter).padStart(2, '0')}`;

    li.append(number, timestamp);
    laps.appendChild(li);

    clearButton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.appendChild(clearButton);
    clearButton.classList.add("hidden");
    lapItem = 0;
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearButton.addEventListener("click", clearAll);
