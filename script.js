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

let timetable = [];
let tiles = [];

let i = 0;
let j = 0;
let k = 0;

for (const day of days) {
    let children = Array.from(day.children);

    children = children.filter((n) => n.id !== "locked");

    let b = [];

    children.map((n) => {
        let subject = document.createElement("p");
        subject.id = "subject";

        let room = document.createElement("p");
        room.id = "room";

        n.appendChild(subject);
        n.appendChild(room);

        let a = new Tile(j, k);
        b.push(a);

        k++;
    });

    timetable[i] = children;
    tiles.push(b);

    i++;
    j++;
    k = 0;
}

// let tilesAnchor = [...tiles];
// console.log(tilesAnchor);

// console.log(timetable);

function removeChosen(array, chosen) {
    array.splice(array.indexOf(chosen), 1);

    return chosen;
}

function rand(array) {
    // let rand = Math.floor(Math.random() * array.length);
    // console.log(rand);
    // console.log(array[rand]);

    return array[Math.floor(Math.random() * array.length)];
}

function chooseRandTile() {
    let randDay = rand(tiles);
    // console.log(randDay);

    if (randDay.length == 0) {
        removeChosen(tiles, randDay);
        randDay = rand(tiles);
    }
    // WEAKLING
    // WAAAAAAAAAAAA

    // console.log(`randDay: ${randDay.length}`);
    // console.log(`tiles: ${tiles.length}`);

    let randPeriod = rand(randDay);

    return removeChosen(randDay, randPeriod);
}

function chooseRandRoom() {
    // let chosen = rand(rooms);

    return removeChosen(rooms, rand(rooms));
}

let subjects = {
    priomha: ["Béarla", "Gaeilge", "Mata", "Géarmáinis/<br />Fraincis"], // i'm sowwy 3:

    roghnach: [
        ["Adhmadóireacht", "Innealtóireacht", "Eac Bhaile"],
        ["Ealaín", "Graif Teic", "Gnó"],
        ["Fisic", "Ceimic", "Bitheolaíocht"],
    ],
};

let rooms = ["Seomra Mór", "S5", "S9", "Bialann", "S1", "S2", "S3", "S4", "S6", "S7", "S8", "S10", "S11", "S12", "S13", "S14", "S15"];
let roomsAnchor = [...rooms];

subjects.priomha.forEach((subject) => {
    let chosen = chooseRandTile();

    chosen.addSubject(subject);
    chosen.addRoom(chooseRandRoom());
});

subjects.roghnach.forEach((group) => {
    for (const subject of group) {
        let chosen = chooseRandTile();

        chosen.addSubject(subject);
        chosen.addRoom(chooseRandRoom());
    }
});

// console.log(rooms);
// console.log(roomsAnchor);

// tiles = tilesAnchor;
// rooms = roomsAnchor;

// console.log(tiles);
// console.log(tilesAnchor);
// console.log(rooms);

fixArrays();

function fixArrays() {
    tiles = [];
    let l = 0;
    let m = 0;

    for (const day of days) {
        let b = [];

        let children = Array.from(day.children);

        children = children.filter((n) => n.id !== "locked");

        children.map(() => {
            let a = new Tile(l, m);
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
// console.log(roomsAnchor);

let subject, room, subjectSelector, roomSelector;
const popup = document.getElementById("popup-bg");

function formSubmit(e) {
    e.preventDefault();

    subject.innerHTML = subjectSelector.value;
    room.innerHTML = roomSelector.value;

    popup.dataset.hidden = "true";
}

function escapeForm(e) {
    if (e.keyCode === 27 && popup.dataset.hidden == "false") popup.dataset.hidden = "true";
}

for (let day of timetable) {
    day = day.filter((n) => n.id != "locked");

    day.forEach((n) => {
        n.onclick = (e) => {
            subject = e.target.firstElementChild;
            room = e.target.lastElementChild;

            popup.dataset.hidden = "false";

            subjectSelector = document.getElementById("subject_input");
            roomSelector = document.getElementById("room_input");

            subjectSelector.value = subject.innerHTML;
            roomSelector.value = room.innerHTML;

            // console.log(e.target);
            // console.log(e.target.firstElementChild.innerText);
        };
    });
}

const form = document.getElementById("tile_submit");

form.onsubmit = (e) => formSubmit(e);
document.onkeydown = (e) => escapeForm(e);
