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

function addText(text, subject) {
    subject.firstElementChild.innerHTML = text;
}

function rand(array) {
    var rand = Math.floor(Math.random() * array.length);
    console.log(rand);

    return rand;
}

function chooseRand(subject) {
    var randDays = rand(days);
    var randPeriod = rand(Array(6));

    if (timetable[randDays][randPeriod].firstElementChild.innerHTML != "") chooseRand(subject);

    addText(subject, timetable[randDays][randPeriod]);
}

var subjects = ["Béarla", "Gaeilge", "Mata"];

subjects.forEach((n) => chooseRand(n));

// alert("if you are reading this, i messed up somehow");
