import { timetable, chooseRandRoom, chooseRandTile, fixArrays } from "/modules/timetable.js";
import { subject, room, subjectSelector, roomSelector } from "/modules/popup.js";

// let tilesAnchor = [...tiles];
// console.log(tilesAnchor);

// console.log(timetable);

let subjects = {
    priomha: ["Béarla", "Gaeilge", "Mata", "Géarmáinis/<br />Fraincis"], // i'm sowwy 3:

    roghnach: [
        ["Adhmadóireacht", "Innealtóireacht", "Eacnamaíocht Bhaile"],
        ["Ealaín", "Graific Teicniúil", "Gnó"],
        ["Fisic", "Ceimic", "Bitheolaíocht"],
    ],
};

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

// console.log(rooms);
// console.log(roomsAnchor);

// document.onmousemove = () => console.log(mouseOverPopup);

const weekDays = ["Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine"];
const times = ["8:30 - 9:28", "9:28 - 10:26", "10:53 - 11:51", "11:51 - 12:49", "13:24 - 14:22", "14:22 - 15:20"];

timetable.forEach((day, dayIndex) => {
    day = day.filter((n) => n.id != "locked");

    day.forEach((n, index) => {
        n.onclick = (e) => {
            subject = e.target.firstElementChild;
            room = e.target.lastElementChild;

            popup.dataset.hidden = "false";

            subjectSelector = document.getElementById("subject_input");
            roomSelector = document.getElementById("room_input");

            subjectSelector.value = subject.innerHTML;
            roomSelector.value = room.innerHTML;

            const title = document.getElementById("popup_title");

            title.innerHTML = `${weekDays[dayIndex]}, ${times[index]}`;
        };
    });
});
