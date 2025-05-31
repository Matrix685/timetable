import { timetablePopup as timetable } from "../modules/timetable.js";
import { commencePopup } from "../modules/popup.js";

const weekDays = ["Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine"];
const times = ["8:30 - 9:28", "9:28 - 10:26", "10:53 - 11:51", "11:51 - 12:49", "13:24 - 14:22", "14:22 - 15:20"];

timetable.forEach((day, dayIndex) => {
    day = day.filter((n) => n.id != "locked");

    day.forEach((n, index) => {
        n.onclick = (e) => {
            commencePopup(e);

            const title = document.getElementById("popup_title");

            title.innerHTML = `${weekDays[dayIndex]}, ${times[index]}`;
        };
    });
});
