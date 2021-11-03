var data = {};

const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");
console.log("hola");
/* Loading */

/*fetch("url")
.then(res => res.json())
.then(data => {
    this.data = data;

    eventName.value = data.name;
    eventDescription.value = data.description;
    eventDate.value = data.date;
    // Llamada al backend para ver los grupos disponibles
});*/

eventName.value = "Evento 1";
eventDescription.value = "dsjasdhakslhkhjdfkashfjkldshfsakjfhsdkafhsdajkfh flas fjasfdhslajkfhsajfhsa dlsjhf asdhfsjkfhsajlfhdsajfasjlfhaksfhsdajkfhsafjahs";

var now = new Date();

var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);

var today = now.getFullYear()+"-"+(month)+"-"+(day);
eventDate.value = today;

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
    })
});