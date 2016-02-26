var timeId = 0;

function loadFromStorage() {
    timeId = localStorage.getItem("nextTimeId");
    for(var object in localStorage) {
        if(object != "nextTimeId"){
            $("#times").prepend($('<li class="time" id="' + object + '">').text(localStorage.getItem(object)));
        }
    }
}