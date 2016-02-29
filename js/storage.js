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