const days = document.getElementsByClassName("classes");

function Tile(day, group, period) {
    this.day = day;
    this.group = group;
    this.period = period;

    this.addSubject = function (text, examLength) {
        // const tile = timetable[this.day][this.period].firstElementChild;
        const group = timetable[this.day][this.group];

        group[0].firstElementChild.innerHTML = text;
        // tile.style.setProperty("--exam-length", examLength);
        let tileHeight = 50 * examLength;

        group[0].style.height = `${tileHeight}%`;
        group[0].dataset.available = "false";

        if (group.length == 2) {
            let responsiveHeight = 100 - tileHeight;

            group[1].style.height = `${responsiveHeight}%`;

            if (responsiveHeight < 50) {
                group[1].dataset.available = "false";
            }
        }
    };

    this.addRoom = function (text) {
        // const tile = timetable[this.day][this.period].firstElementChild;
        const tile = timetable[this.day][this.group][0];

        tile.lastElementChild.innerHTML = text;
    };
}

let timetable = [];
let timetablePopup = [];
let tiles = [];

for (const day of days) {
    let children = Array.from(day.children); // array of row-groups

    let dayPopup = [];

    let groups = children.map((rowGroup) => {
        let group = [];

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
            group.push(row);
            dayPopup.push(row);
        }

        return group;
    });

    // console.log("%cGROUP ARRAY (should have 3 arrays of 2 objects)", "font-size: 15px; color: #0f0");
    // console.log(correspondingGroup);

    timetable.push(groups);
    timetablePopup.push(dayPopup);
}

// console.log(timetablePopup);

function filterArrays() {
    timetable = timetable.filter((day) => day.length != 0);
    timetable = timetable.map((day) => day.filter((group) => group.length != 0));
    timetable = timetable.map((day) => day.map((group) => group.filter((n) => n.dataset.available != "false")));

    console.log(timetable);

    tiles = [];
    let dayTracker = 0;

    for (const day of timetable) {
        let correspondingGroup = [];
        let periodTracker = 0;
        let groupTracker = 0;

        for (const group of day) {
            let correspondingTiles = [];

            group.forEach(() => {
                let a = new Tile(dayTracker, groupTracker, periodTracker);
                correspondingTiles.push(a);

                periodTracker++;
            });

            groupTracker++;

            correspondingGroup.push(correspondingTiles);
        }

        dayTracker++;

        tiles.push(correspondingGroup);
    }
}

filterArrays();

// console.log(timetable);
// console.log(tiles);

function removeChosen(array, chosen) {
    array.splice(array.indexOf(chosen), 1);

    return chosen;
}

function rand(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function chooseRandTile() {
    let randDay = rand(tiles);
    let randGroup = rand(randDay);

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

export { timetablePopup };
