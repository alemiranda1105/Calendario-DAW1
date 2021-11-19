var data = {};

const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

const oldData = JSON.parse(localStorage.getItem('event'));
localStorage.removeItem('event');

eventName.value = oldData.name;
eventDescription.value = oldData.description;

eventDate.value = oldData.date.replace(/(\d\d)-(\d\d)-(\d{4})/, "$3-$2-$1");

for (let i = 1; i < 6; i++) {
    groupSelector.options[groupSelector.options.length] = new Option('Grupo ' + i, 'g' + i);
}

$('#save-btn').submit((e) => {
    e.preventDefault();
    const data = {
        name: eventName.value,
        description: eventDescription.value,
        date: eventDate.value.toISOString().split('T')[0],
        group: $("#group-selector option:selected").text()
    };

    fetch("url", {
        method: "POST",
        body: data
    })
    .then((res) => {
        if(res.ok) {
            alert("Grupo actualizado");
            location.reload();
        } else {
            alert("Error");
        }
    });
});