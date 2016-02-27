'use strict';

var timeId = 0;

function pushToStorage(time) {
    localStorage.setItem(timeId++, time);
    localStorage.setItem("nextId", timeId);
}

function loadFromStorage() {
    timeId = localStorage.getItem("nextId");
    for(var object in localStorage) {
        if(object != "nextId") {
            $("#times").prepend($('<li class="button" id="' + object + '">').text(localStorage.getItem(object)));
        }
    }
}