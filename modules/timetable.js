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

export { timetable, chooseRandRoom, chooseRandTile, fixArrays };
