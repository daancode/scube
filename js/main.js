'use strict';

var scramble = new Scramble();
var timer = new Timer();

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        if (timer.lock) {
            timer.stop();
            var time = document.getElementById("timer").innerHTML;
            saveTime(time);
            $("#times").prepend($('<li class="button" id="' + (session.length - 1) + '">').text(time));
            $("#sidebar").getNiceScroll().resize();
            refreshStats();
        }
        else {
            document.getElementById("timer").style.color = "#00c8ff";
        }
    } 
}, true);

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 32) {
        if(!timer.lock) {
            timer.start();
            document.getElementById("timer").style.color = "#212121";
        } 
        else {
            scramble.generate(25);
            timer.lock = false;
        }
    }
}, true);

$(document).ready(function() {            
    $("#times").niceScroll({
        touchbehavior: false,
        cursoropacitymax: 0.0,
        background: "#191919",
        grabcursorenabled: false,
        nativeparentscrolling: false
    });
});