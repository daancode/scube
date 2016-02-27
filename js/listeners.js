'use strict';

var scramble = new Scramble;
var timer = new Timer;

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
        if(timer.lock) {
            timer.clear();
            var time = document.getElementById("timer").innerHTML;
            $("#times").prepend($('<li class="button" id="' + timeId + '">').text(time));
            $("#sidebar").getNiceScroll().resize();
            pushToStorage(time);
        }
        else {
            document.getElementById("timer").style.color= "#00c8ff";
        }
    } 
}, true);

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 32) {
        if(!timer.lock) {
            timer.start();
            document.getElementById("timer").style.color="#212121";
        } 
        else {
            scramble.generate(25);
            timer.lock = false;
        }
    }
}, true);