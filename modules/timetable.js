const days = document.getElementsByClassName("classes");

function Tile(day, period) {
    this.day = day;
    this.period = period;

    this.addSubject = function (text, examLength) {
        const tile = timetable[this.day][this.period];

        tile.firstElementChild.innerHTML = text;
        tile.style.setProperty("--exam-length", examLength);
    };

    this.addRoom = function (text) {
        const tile = timetable[this.day][this.period];

        tile.lastElementChild.innerHTML = text;
    };
}

let timetable = [];
let tiles = [];

// let i = 0;
let dayTracker = 0;
let periodTracker = 0;
let l = 0;

let correspondingGroup = []; // needs to reset every day after pushing 3 arrays

for (const day of days) {
    let children = Array.from(day.children); // array of row-groups

    children.forEach((rowGroup) => {
        let correspondingTiles = []; // needs to reset every new row-group after creating 2 tiles

        for (let i = 0; i < 2; i++) {
            let row = document.createElement("div");
            row.classList.add("rows");

            let subject = document.createElement("p");
            subject.id = "subject";

            let room = document.createElement("p");
            room.id = "room";

            row.appendChild(subject);
            row.appendChild(room);

            rowGroup.appendChild(row);

            let a = new Tile(dayTracker, periodTracker);
            correspondingTiles.push(a);

            periodTracker++;
        }

        console.log("%cTILES ARRAY (should have 2 objects)", "font-size: 15px; color: #f00;");
        console.log(correspondingTiles);

        correspondingGroup.push(correspondingTiles);
    });

    console.log("%cGROUP ARRAY (should have 3 arrays of 2 objects)", "font-size: 15px; color: #0f0");
    console.log(correspondingGroup);

    timetable.push(children);
    // tiles.push(correspondingGroup);
    tiles[l] = correspondingGroup;

    correspondingGroup = [];

    l++;
    dayTracker++;
    periodTracker = 0;
}

// for (const day of days) {
//     let children = Array.from(day.children);

//     // children = children.filter((n) => n.id !== "locked");

//     let p = [];
//     let v = [];

//     children.map((n) => {
//         let b = [];

//         for (let l = 0; l < 2; l++) {
//             let row = document.createElement("div");
//             row.classList.add("rows");

//             let subject = document.createElement("p");
//             subject.id = "subject";

//             let room = document.createElement("p");
//             room.id = "room";

//             row.appendChild(subject);
//             row.appendChild(room);

//             n.appendChild(row);

//             let a = new Tile(j, k);
//             b.push(a);

//             k++;
//         }

//         console.log("%cB ARRAY (should have 2 objects)", "font-size: 15px; color: #f00;");
//         console.log(b);

//         p.push(b);
//     });

//     // v.push(p);
//     console.log("%cP ARRAY (should have 3 arrays of 2 objects)", "font-size: 15px; color: #0f0");
//     console.log(p);

//     timetable[i] = children;
//     tiles.push(p);

//     i++;
//     j++;
//     k = 0;
// }

console.log(timetable);
console.log(tiles);

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

    let randGroup = rand(randDay);

    return removeChosen(randDay, randGroup);
}

function chooseRandRoom() {
    return removeChosen(rooms, rand(rooms));
}

// let subjects = {
//     priomha: ["Béarla", "Gaeilge", "Mata", "Géarmáinis/<br />Fraincis"], // i'm sowwy 3:

//     roghnach: [
//         ["Adhmadóireacht", "Innealtóireacht", "Eacnamaíocht Bhaile"],
//         ["Ealaín", "Graific Teicniúil", "Gnó"],
//         ["Fisic", "Ceimic", "Bitheolaíocht"],
//     ],
// };

let subjects = {
    priomha: [
        {
            name: "Béarla",
            examLength: 2, // length in hours (this might be a problem)
        },
        {
            name: "Gaeilge",
            examLength: 1, // length in hours
        },
        {
            name: "Mata",
            examLength: 1.5, // length in hours (this, too, might be a problem)
        },
        {
            name: "Géarmáinis/<br />Fraincis",
            examLength: 1, // length in hours
        },
    ],

    roghnach: [
        // figure this out later
        ["Adhmadóireacht", "Innealtóireacht", "Eacnamaíocht Bhaile"],
        ["Ealaín", "Graific Teicniúil", "Gnó"],
        ["Fisic", "Ceimic", "Bitheolaíocht"],
    ],
};

let rooms = ["Seomra Mór", "Bialann", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15"];
let roomsAnchor = [...rooms];

subjects.priomha.forEach((subject) => {
    let chosen = chooseRandTile()[0];

    chosen.addSubject(subject.name, subject.examLength);
    chosen.addRoom(chooseRandRoom());
});

subjects.roghnach.forEach((group) => {
    for (const subject of group) {
        let chosen = chooseRandTile()[0];

        chosen.addSubject(subject, 1); // just for now
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
