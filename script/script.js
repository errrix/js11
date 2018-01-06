var second = document.getElementById(`second`);
var minute = document.getElementById(`minute`);
var hour = document.getElementById(`hour`);
var buttonStart = document.getElementById(`button_start`);
var buttonStop = document.getElementById(`button_stop`);
var arrow = document.getElementById(`arrow`);
var counterTimeout;
var counterSeconds = 1;
var counterMinutes = 0;
var counterHours = 0;

buttonStart.addEventListener(`click`, startTimer);
buttonStart.addEventListener(`mousedown`, changeBorder);
		
function changeBorder() {
	this.style.border = `4px solid white`;
};

function clear () {
	buttonStart.addEventListener(`mousedown`, changeBorder);
	buttonStart.innerText = 'СТАРТ';
	buttonStop.innerText = `ПАУЗА`;
	buttonStart.addEventListener(`click`, startTimer);
	arrow.style.transform = ``;
	counterSeconds = 1;
	counterMinutes = 0;
	counterHours = 0;
	buttonStop.style.border = ``;
	clearTimeout(counterTimeout);
	second.innerText = `00`;
	minute.innerText = `00:`;
	hour.innerText = `00:`;
};

function pause () {
	buttonStop.style.border = ``;
	buttonStart.addEventListener(`mousedown`, changeBorder);
	buttonStop.innerText = `ОЧИСТИТЬ`
	buttonStop.addEventListener(`click`, clear);
	buttonStop.removeEventListener(`click`, pause);
	buttonStart.innerText = 'ПРОДОЛЖИТЬ';
	buttonStart.addEventListener(`click`, startTimer);
	clearTimeout(counterTimeout);
};

function startTimer() {
	buttonStop.addEventListener(`mousedown`, changeBorder);
	buttonStart.removeEventListener(`mousedown`, changeBorder);
	buttonStop.innerText = `ПАУЗА`;
	buttonStop.removeEventListener(`click`, clear);
	buttonStop.addEventListener(`click`, pause);
	buttonStart.removeEventListener(`click`, startTimer);
	buttonStart.style.border = ``;
	
	setTimeout(function timer() {
		arrow.style.transform = `rotate(` + counterSeconds * 6 +`deg)`;

		if (counterSeconds < 10 ) {
			second.innerText = `0` + counterSeconds;
		} else if (counterSeconds > 60) {
			counterSeconds = 1;
			second.innerText = `0` + counterSeconds;
			counterMinutes++;
		}else{
			second.innerText = counterSeconds;
		}

		if (counterMinutes < 10 ) {
			minute.innerText = `0` + counterMinutes + `:`;
		} else if (counterMinutes < 60) {
			minute.innerText = counterMinutes + `:`;
		} else {
			counterHours++;
			counterMinutes = 0;
			minute.innerText = `0` + + counterMinutes + `:`;
		}
	
		if (counterHours < 10) {
			hour.innerText = `0` + counterHours + `:`; 
		} else if(counterHours < 24) {
			hour.innerText = counterHours + `:`; 
		} else {
			counterHours = 0;
			hour.innerText = `00:`; 
		}

		counterSeconds++;
		counterTimeout = setTimeout(timer, 1000);
	}, 1000);
};