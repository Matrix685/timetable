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

        var a = new Tile(j, k);
        b.push(a);

        k++;
    });

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
    // var rand = Math.floor(Math.random() * array.length);
    // console.log(rand);
    // console.log(array[rand]);

    return array[Math.floor(Math.random() * array.length)];
}

function chooseRandTile() {
    var randDay = rand(tiles);
    // console.log(randDay);

    if (randDay.length == 0) {
        removeChosen(tiles, randDay);
        randDay = rand(tiles);
    }
    // WEAKLING
    // WAAAAAAAAAAAA

    // console.log(`randDay: ${randDay.length}`);
    // console.log(`tiles: ${tiles.length}`);

    var randPeriod = rand(randDay);

    return removeChosen(randDay, randPeriod);
}

function chooseRandRoom() {
    // var chosen = rand(rooms);

    return removeChosen(rooms, rand(rooms));
}

var subjects = {
    priomha: ["Béarla", "Gaeilge", "Mata", "Géarmáinis/<br />Fraincis"], // i'm sowwy 3:

    roghnach: [
        ["Adhmadóireacht", "Miotalóireacht", "Eac Bhaile"],
        ["Ealaín", "Graif Teic", "Gnó"],
        ["Fisic", "Ceimic", "Bitheolaíocht"],
    ],
};

var rooms = [
    "Seomra Mór",
    "S5",
    "S9",
    "Bialann",
    "S1",
    "S2",
    "S3",
    "S4",
    "S6",
    "S7",
    "S8",
    "S10",
    "S11",
    "S12",
    "S13",
    "S14",
];
var roomsAnchor = JSON.parse(JSON.stringify(rooms));

subjects.priomha.forEach((subject) => {
    var chosen = chooseRandTile();

    chosen.addSubject(subject);
    chosen.addRoom(chooseRandRoom());
});

subjects.roghnach.forEach((group) => {
    for (const subject of group) {
        var chosen = chooseRandTile();

        chosen.addSubject(subject);
        chosen.addRoom(chooseRandRoom());
    }
});

fixArrays();

function fixArrays() {
    tiles = [];
    var l = 0;
    var m = 0;

    for (const day of days) {
        var b = [];

        Array.from(day.children).forEach(() => {
            var a = new Tile(l, m);
            b.push(a);

            m++;
        });

        tiles.push(b);

        l++;
        m = 0;
    }

    rooms = roomsAnchor;
}

// console.log(rooms);
