let subject, room, subjectSelector, roomSelector, mouseOverPopup;

const popup = document.getElementById("popup-bg");
const popupWindow = popup.firstElementChild;

popupWindow.onmouseenter = () => (mouseOverPopup = true);
popupWindow.onmouseleave = () => (mouseOverPopup = false);

popup.onmousedown = () => {
    if (!mouseOverPopup) escapeForm();
};

function tileClicked(e) {
    subject = e.target.firstElementChild;
    room = e.target.lastElementChild;

    popup.dataset.hidden = "false";

    subjectSelector = document.getElementById("subject_input");
    roomSelector = document.getElementById("room_input");

    subjectSelector.value = subject.innerHTML;
    roomSelector.value = room.innerHTML;
}

function formSubmit(e) {
    e.preventDefault();

    subject.innerHTML = subjectSelector.value;
    room.innerHTML = roomSelector.value;

    escapeForm();
}

function escapeForm() {
    popup.dataset.hidden = "true";
}

const form = document.getElementById("tile_submit");

form.onsubmit = (e) => formSubmit(e);

document.onkeydown = (e) => {
    if (e.key === "Escape" && popup.dataset.hidden === "false") escapeForm();
};

document.getElementById("escape").addEventListener("click", escapeForm);

export { tileClicked };
