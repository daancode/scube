/*jslint browser: true*/
/*global $, jQuery, alert*/

'use strict';

var session = [];

function findExtremes(array) {
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
        best  !==  Infinity ? best  : "-.--",
        worst !== -Infinity ? worst : "-.--"
    ];
}

function avg(length) {
    var i, sum = 0, array = session.slice(session.length - length, session.length);
    for (i = 0; i < length; i += 1) {
        sum += array[i];
    }
    var extreme = findExtremes(array);
    sum -= (extreme[0] + extreme[1]);
    return (sum /= (length - 2));
}

function refreshStats() {
    var times = findExtremes(session);
    document.getElementById("bestTime").innerHTML
        = times[0] !== "-.--" ? timer.parse(times[0]) : "-.--";
    
    document.getElementById("worstTime").innerHTML
        = times[1] !== "-.--" ? timer.parse(times[1]) : "-.--";
    
    document.getElementById("avg5").innerHTML
        = session.length >= 5 ? timer.parse(avg(5)) : "-.--";
    
    document.getElementById("avg12").innerHTML
        = session.length >= 12 ? timer.parse(avg(12)) : "-.--";
    
    document.getElementById("savg").innerHTML
        = session.length > 2 ? timer.parse(avg(session.length)) : "-.--";
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

function removeEntry(id) {
    session.splice(id, 1);
    localStorage.setItem("session", JSON.stringify(session));
    updateEntries();
    refreshStats();
}

function removeAllEntries() {
    session = [];
    $("#times").empty();
    localStorage.setItem("session", JSON.stringify(session));
    refreshStats();
}