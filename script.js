const days = document.getElementsByClassName("classes");
var timetable = [];
// var subjectNames = document.getElementsByClassName("monday-classes")[0].children;
var i = 0;

for (const day of days) {
    timetable[i] = Array.from(day.children);

    i++;
}

console.log(timetable);

timetable[1][2];
