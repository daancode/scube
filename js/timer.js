function Timer() {
    this.timer = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.lock = false;
    this.startTime = 0;
}

Timer.prototype.update = function () {
    var currentTime = new Date();
    this.seconds = ((currentTime - this.startTime) / 1e3).toFixed(2);
    
    if(this.seconds >= 60) {
        this.minutes += 1;
        this.startTime = currentTime;
        this.seconds = 0;
    }
    
    var set = (arg) => {
        return arg < 10 ? "0" + arg : arg;
    }
    
    document.getElementById("timer").innerHTML = 
        this.minutes > 0 ? this.minutes + ":" + set(this.seconds) : this.seconds;
    
    var handle = this;
    this.timer = setTimeout(function() {
        handle.update();
    });
}

Timer.prototype.clear = function () {
    clearTimeout(this.timer);
    this.timer = 0;
}

Timer.prototype.initialize = function () {
    this.clear();
    this.seconds = this.minutes = 0;
    document.getElementById("timer").innerHTML = "0.00";
}

Timer.prototype.start = function () {
    this.startTime = new Date();
    this.lock = true;
    this.initialize();
    this.update();
}

var timer = new Timer;

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
        if(timer.lock) {
            timer.clear();
        }
        else {
            document.getElementById("timer").style.color= "red";
        }
    } 
}, true);

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 32) {
        if(!timer.lock) {
            timer.start();
            document.getElementById("timer").style.color="#1e1e1e";
        } 
        else {
            timer.lock = false;
        }
    }
}, true);