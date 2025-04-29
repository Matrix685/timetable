let subject, room, subjectSelector, roomSelector, mouseOverPopup;

const popup = document.getElementById("popup-bg");
const popupWindow = popup.firstElementChild;

popupWindow.onmouseenter = () => (mouseOverPopup = true);
popupWindow.onmouseleave = () => (mouseOverPopup = false);

popup.onclick = () => {
    if (!mouseOverPopup) escapeForm();
};

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

export { subject, room, subjectSelector, roomSelector };
