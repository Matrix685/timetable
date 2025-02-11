const days = document.getElementsByClassName("classes");

function Tile(day, period) {
    this.day = day;
    this.period = period;

    this.addSubject = function (text) {
        timetable[this.day][this.period].firstElementChild.innerHTML = text;
    };

    this.addRoom = function (text) {
        timetable[this.day][this.period].lastElementChild.innerHTML = text;
    };
}

var timetable = [];
var tiles = [];

var i = 0;
var j = 0;
var k = 0;

for (const day of days) {
    var children = Array.from(day.children);
    var b = [];

    children.map((n) => {
        var subject = document.createElement("p");
        subject.id = "subject";

        var room = document.createElement("p");
        room.id = "room";

        n.appendChild(subject);
        n.appendChild(room);

        a = new Tile(j, k);
        b.push(a);

        k++;
    });
    // console.log(day.children);

    timetable[i] = children;
    tiles.push(b);

    i++;
    j++;
    k = 0;
}

function buttonClicked() {
    var daySelector = document.getElementById("day_selector").value,
        periodSelector = document.getElementById("period_selector").value,
        text = document.getElementById("text").value;

    tiles[daySelector][periodSelector].addSubject(text);

    document.getElementById("text").value = "";
}

function removeChosen(array, chosen) {
    array.splice(array.indexOf(chosen), 1);

    return chosen;
}

function rand(array) {
    var rand = Math.floor(Math.random() * array.length);
    // console.log(rand);
    // console.log(array[rand]);

    return array[rand];
}

function chooseRand() {
    var randDay = rand(tiles);
    var randPeriod = rand(randDay);

    return removeChosen(randDay, randPeriod);
}

var subjects = ["Béarla", "Gaeilge", "Mata"];
var rooms = ["semora mor", "5", "9"];

subjects.forEach((subject) => {
    var chosen = chooseRand();

    chosen.addSubject(subject);
    chosen.addRoom(removeChosen(rooms, rand(rooms)));
});

// console.log(tiles);
