'use strict';

var session = [];

function saveTime(time) {
    if(!session) {
        session = [];
    }
    session.push(time);
    localStorage.setItem("session", JSON.stringify(session));
}

function eraseTime(id) {
    session.splice(id, 1);
    localStorage.setItem("session", JSON.stringify(session));
    loadFromStorage();
    refreshStats();
}

function loadFromStorage() {
    session = JSON.parse(localStorage.getItem("session"));
    if(session){
        var i = 0;
        session.forEach(function(obj) {
            $("#times").prepend($('<li class="button" id="' + i++ + '">').text(obj));
        });
    }
}

function clearSession() {
    session = [];
    $("#times").empty();
    localStorage.setItem("session", JSON.stringify(session));
}

function refreshStats() {
    findBestTime();
    findWorstTime();
}

function findBestTime() {
    var bestTimeIndex = -1;
    var len = session.length, min = Infinity;
    while (len--) {
        if (Number(session[len]) < min) {
            min = Number(session[len]);
            bestTimeIndex = len;
        }
    }
    
    if(bestTimeIndex != -1) {
        document.getElementById("bestTime").innerHTML = session[bestTimeIndex];
    } else {
        document.getElementById("bestTime").innerHTML = "-.--";
    }
}

function findWorstTime() {
    var worstTimeIndex = -1;
    var len = session.length, max = -Infinity;
    while (len--) {
        if (Number(session[len]) > max) {
            max = Number(session[len]);
            worstTimeIndex = len;
        }
    }
    
    if(worstTimeIndex != -1) {
        document.getElementById("worstTime").innerHTML = session[worstTimeIndex];
    } else {
        document.getElementById("worstTime").innerHTML = "-.--";
    }
}