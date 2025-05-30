const days = document.getElementsByClassName("classes");

function Tile(day, group, period) {
    this.day = day;
    this.group = group;
    this.period = period;

    this.addSubject = function (text, examLength) {
        // const tile = timetable[this.day][this.period].firstElementChild;
        const group = timetable[this.day][this.group];

        group.firstElementChild.firstElementChild.innerHTML = text;
        // tile.style.setProperty("--exam-length", examLength);
        let tileHeight = 50 * examLength;
        let responsiveHeight = 100 - tileHeight;

        group.firstElementChild.style.height = `${tileHeight}%`;
        group.lastElementChild.style.height = `${responsiveHeight}%`;

        if (responsiveHeight < 50) {
            group.lastElementChild.dataset.available = "false";
        }
    };

    this.addRoom = function (text) {
        // const tile = timetable[this.day][this.period].firstElementChild;
        const tile = timetable[this.day][this.group].firstElementChild;

        tile.lastElementChild.innerHTML = text;
    };
}

let timetable = [];

for (const day of days) {
    let children = Array.from(day.children); // array of row-groups

    children.forEach((rowGroup) => {
        for (let i = 0; i < 2; i++) {
            let row = document.createElement("div");
            row.classList.add("rows");
            row.dataset.available = "true";

            let subject = document.createElement("p");
            subject.id = "subject";

            let room = document.createElement("p");
            room.id = "room";

            row.appendChild(subject);
            row.appendChild(room);

            rowGroup.appendChild(row);
        }
    });

    // console.log("%cGROUP ARRAY (should have 3 arrays of 2 objects)", "font-size: 15px; color: #0f0");
    // console.log(correspondingGroup);

    timetable.push(children);
}

function filterArrays() {
    for (const day of timetable) {
        day.forEach((group) => {
            console.log(group);
            group = group.filter((n) => n.dataset.available != "false");
        });
    }

    let tiles = [];
    let dayTracker = 0;

    for (const day of timetable) {
        let correspondingGroup = [];
        let periodTracker = 0;
        let groupTracker = 0;

        day.forEach(() => {
            let a = new Tile(dayTracker, groupTracker, periodTracker);
            correspondingGroup.push(a);

            periodTracker++;
        });

        groupTracker++;
    }

    dayTracker++;
    tiles.push(correspondingGroup);
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

    if (randGroup.length == 0) {
        removeChosen(randDay, randGroup);
        randGroup = rand(tiles);
    }

    // console.log(randGroup);

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
        ["Tíreolaíocht", "Stair", "OSPS"],
    ],
};

let rooms = ["Seomra Mór", "Bialann", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S15"];

subjects.priomha.forEach((subject) => {
    filterArrays();

    let chosen = chooseRandTile()[0];

    // console.log(chosen);

    chosen.addSubject(subject.name, subject.examLength);
    chosen.addRoom(chooseRandRoom());
});

subjects.roghnach.forEach((group) => {
    for (const subject of group) {
        filterArrays();

        let chosen = chooseRandTile()[0];

        chosen.addSubject(subject, 1); // just for now
        chosen.addRoom(chooseRandRoom());
    }
});

export { timetable };
