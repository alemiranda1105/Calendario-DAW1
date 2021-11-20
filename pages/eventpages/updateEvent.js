var data = {};

const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

const oldData = JSON.parse(localStorage.getItem('event'));
console.log(oldData.group);

eventName.value = oldData.name;
eventDescription.value = oldData.description;

eventDate.value = oldData.date.replace(/(\d\d)-(\d\d)-(\d{4})/, "$3-$2-$1");


let user;
getCurrentUser().then(data => {
    if(data === undefined) {
        window.location.replace("http://localhost:5500/pages/inicio/inicio.html")
    }
    user = data;
    user.groupid.forEach((id, index) => {
        getGroupById(id).then(group => {
            //groupSelector.options[groupSelector.options.length] = new Option(group.name);
            var opt = document.createElement('option');
            opt.value = group.name;
            opt.innerHTML = group.name;
            groupSelector.appendChild(opt);
            if(oldData.group !== undefined && oldData.group === group.name) {
                $("#group-selector").prop("selectedIndex", index+1);
            }
        });
    });
});

$(document).ready(() => {
    
});

$('#update-event').submit((e) => {
    e.preventDefault();
    const data = {
        id: oldData.id,
        name: eventName.value,
        description: eventDescription.value,
        date: eventDate.value
    };

    alert("Evento actualizado");
    window.location.replace("/pages/HomePage/homePage.html");
    /*fetch("url", {
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
    });*/
});