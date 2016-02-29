/*jslint browser: true*/
/*global $, jQuery, alert*/

'use strict';

var timer = new Timer();

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        if (timer.lock) {
            timer.stop();
            appendEntry(timer.time);
            updateEntries();
            refreshStats();
            $("#sidebar").getNiceScroll().resize();
        } else {
            document.getElementById("timer").style.color = "red";
        }
    } 
}, true);

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 32) {
        if (!timer.lock) {
            timer.start();
            document.getElementById("timer").style.color = "#00c8ff";
        } else {
            timer.lock = false;
            getScramble(25);
        }
    }
}, true);

$(document).ready(function () {
    $("#times").niceScroll({
        touchbehavior: false,
        cursoropacitymax: 0.0,
        background: "#191919",
        grabcursorenabled: false,
        nativeparentscrolling: false
    });
    
    $("#stats").niceScroll({
        touchbehavior: false,
        cursoropacitymax: 0.0,
        background: "#191919",
        grabcursorenabled: false,
        nativeparentscrolling: false
    });
    
    getScramble(25);
    updateEntries();
    refreshStats();
});

$("#times").on("click", ".button", function (event) {
    removeEntry(this.id);
});

$("#reset").on("click", function (event) {
    removeAllEntries();
});