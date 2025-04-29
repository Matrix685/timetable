import { timetable, chooseRandRoom, chooseRandTile, fixArrays } from "../modules/timetable.js";
import { tileClicked } from "../modules/popup.js";

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

fixArrays();

const weekDays = ["Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine"];
const times = ["8:30 - 9:28", "9:28 - 10:26", "10:53 - 11:51", "11:51 - 12:49", "13:24 - 14:22", "14:22 - 15:20"];

timetable.forEach((day, dayIndex) => {
    day = day.filter((n) => n.id != "locked");

    day.forEach((n, index) => {
        n.onclick = (e) => {
            tileClicked(e);

            const title = document.getElementById("popup_title");

            title.innerHTML = `${weekDays[dayIndex]}, ${times[index]}`;
        };
    });
});
