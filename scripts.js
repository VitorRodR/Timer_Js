const display = document.querySelector(".display input");
const startStopBtn = document.querySelector("#start-stop-btn");
const resetBtn = document.querySelector("#reset-btn");

class Timer {
	constructor(){
		this.minutes = 0;
		this.seconds = 0;
		this.miliseconds = 0;
		this.display = display;
		this.isRunning = false;
		this.intervalId;
	}
	
	updateDisplay() {
		if (this.miliseconds>=100) {
			this.seconds+=1;
			this.miliseconds=0;
		}
		
		if (this.seconds>=60) {
			this.minutes+=1;
			this.seconds=0;
		}
		
		this.display.value = this.formatOutput();
	}
	
	formatOutput() {
		let time = [this.minutes, this.seconds, this.miliseconds];
		let output = [];
		
		time.forEach((str) => {
			if (String(str).length < 2) {
				output.push("0" + String(str));
			}
			else {
				output.push(String(str));
			}
		});
		
		return output[0] + ":" + output[1] + "." + output[2];
	}
	
	timeCount() {
		this.miliseconds+=1;
		this.updateDisplay();
	}
	
	startTime() {
		this.intervalId = setInterval(()=>this.timeCount(), 10);
		this.isRunning = true;
	}
	
	stopTime() {
		clearInterval(this.intervalId);
		this.isRunning = false;
	}
	
	resetTime() {
		this.minutes = 0;
		this.seconds = 0;
		this.miliseconds = 0;
		
		this.updateDisplay();
	}
}

const timer = new Timer();
timer.updateDisplay();

startStopBtn.addEventListener("click", function(){
	if (startStopBtn.textContent == "START") {
		timer.startTime();
		startStopBtn.textContent = "STOP";
		startStopBtn.style.backgroundColor = "RED";
	}
	else {
		timer.stopTime();
		startStopBtn.textContent = "START";
		startStopBtn.style.backgroundColor = "GREEN";
	}
});

resetBtn.addEventListener("click", function(){
	if (timer.running) {
		watch.stopTime();
	}
	else {
		timer.resetTime();
	}
	startStopBtn.textContent = "START";
	startStopBtn.style.backgroundColor = "GREEN";
})