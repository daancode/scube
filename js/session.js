/*jslint browser: true*/
/*global $, jQuery, alert*/

'use strict';

var session = [];

function findBestAndWorstTime(array) {
    var i, best = Infinity, worst = -Infinity;
    for (i = array.length; i >= 0; i -= 1) {
        if (array[i] < best) {
            best = array[i];
        }
        if (array[i] > worst) {
            worst = array[i];
        }
    }
    return [
        best  !==  Infinity ? timer.parse(best)  : "-.--", 
        worst !== -Infinity ? timer.parse(worst) : "-.--"
    ];
}

function refreshStats() {
    var times = findBestAndWorstTime(session);
    document.getElementById("bestTime").innerHTML = times[0];
    document.getElementById("worstTime").innerHTML = times[1];
}

function appendEntry(time) {
    if (!session) {
        session = [];
    }
    session.push(time);
    localStorage.setItem("session", JSON.stringify(session));
}

function updateEntries() {
    session = JSON.parse(localStorage.getItem("session"));
    if (session) {
        $("#times").empty();
        var i = -1;
        session.forEach(function (obj) {
            $("#times").prepend($('<li class="button" id="' + (i += 1) + '">').text(timer.parse(obj)));
        });
    }
}

function removeAllEntries() {
    session = [];
    $("#times").empty();
    localStorage.setItem("session", JSON.stringify(session));
    refreshStats();
}

function removeEntry(id) {
    session.splice(id, 1);
    localStorage.setItem("session", JSON.stringify(session));
    updateEntries();
    refreshStats();
}