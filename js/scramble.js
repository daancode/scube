'use strict';

function Scramble() {
    this.last = this.random(6);
    this.selected = this.random(6);
    this.notation = [
        ["R", "R'", "R2", 1],
        ["L", "L'", "L2", 0],
        ["U", "U'", "U2", 3],
        ["D", "D'", "D2", 2],
        ["F", "F'", "F2", 5],
        ["B", "B'", "B2", 4]
    ];
}

Scramble.prototype.random = function (value) {
    return Math.floor(Math.random() * value);
}

Scramble.prototype.nextMove = function () {
    while(this.selected == this.last || this.selected == this.notation[this.last][3]) {
        this.selected = this.random(6);
    }
    this.last = this.selected;
    return this.notation[this.selected][this.random(3)];
}

Scramble.prototype.generate = function (length) {
    var scramble = "";
    for(var i = 0; i < length; ++i) {
        scramble += this.nextMove() + " ";
    }
    document.getElementById("scramble").innerHTML = scramble;
}