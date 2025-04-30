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

function removeChosen(array, chosen) {
    array.splice(array.indexOf(chosen), 1);

    return chosen;
}

function rand(array) {
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

    let randPeriod = rand(randDay);

    return removeChosen(randDay, randPeriod);
}

function chooseRandRoom() {
    return removeChosen(rooms, rand(rooms));
}

let subjects = {
    priomha: ["Béarla", "Gaeilge", "Mata", "Géarmáinis/<br />Fraincis"], // i'm sowwy 3:

    roghnach: [
        ["Adhmadóireacht", "Innealtóireacht", "Eacnamaíocht Bhaile"],
        ["Ealaín", "Graific Teicniúil", "Gnó"],
        ["Fisic", "Ceimic", "Bitheolaíocht"],
    ],
};

let rooms = ["Seomra Mór", "Bialann", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15"];
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

export { timetable };
