const days = document.getElementsByClassName("classes");
var timetable = [];
var i = 0;

for (const day of days) {
    timetable[i] = Array.from(day.children);
    i++;
}

function buttonClicked() {
    var daySelector = document.getElementById("day_selector").value,
        periodSelector = document.getElementById("period_selector").value,
        text = document.getElementById("text").value;

    addText(text, timetable[daySelector][periodSelector]);

    document.getElementById("text").value = "";
}

addText("science", timetable[0][0]);
addText("table tennis", timetable[1][1]);
addText("twelve", timetable[2][2]);
addText("WATCH ARCANE", timetable[3][3]);
addText("science", timetable[4][4]);

addText("science", timetable[0][5]);
addText("science", timetable[1][4]);
addText("science", timetable[2][3]);
addText("science", timetable[3][2]);
addText("science", timetable[4][1]);

function addText(text, subject) {
    subject.children[0].innerHTML = text;
}
