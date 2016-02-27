'use strict';

function Timer() {
    this.timer = 0;
    this.lock = false;
    this.startTime = 0;
    this.time = 0;
}

Timer.prototype.update = function () {
    this.time = (new Date() - this.startTime);     
    document.getElementById("timer").innerHTML = this.parse(this.time);    
}

Timer.prototype.parse = function (time) {
    var min = (time / 1e3 / 60) << 0;
    var sec = (time / 1e3 % 60).toFixed(2);
    return min > 0 ? min + ":" + (sec < 10 ? "0" + sec : sec) : sec;
}

Timer.prototype.start = function () {
    this.lock = true;
    this.initialize();
    this.startTime = new Date();
    var handle = this;
    this.timer = setInterval(function() {
        handle.update();
    });
}

Timer.prototype.clear = function () {
    clearInterval(this.timer);
    this.timer = 0;
}

Timer.prototype.initialize = function () {
    this.clear();
    this.time = 0;
    document.getElementById("timer").innerHTML = "0.00";
}