var data = {};

const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

const oldData = JSON.parse(localStorage.getItem('event'));

eventName.value = oldData.name;
eventDescription.value = oldData.description;

eventDate.value = oldData.date.replace(/(\d\d)-(\d\d)-(\d{4})/, "$3-$2-$1");


let user;
let groups = [];
getCurrentUser().then(data => {
    if(data === undefined) {
        window.location.replace("/pages/index/index.html")
    }
    user = data;
    user.groupid.forEach(({group}, index) => {
        getGroupById(group).then(g => {
            var opt = document.createElement('option');
            opt.value = g.name;
            opt.innerHTML = g.name;
            groupSelector.appendChild(opt);
            groups.push(g);
            if(oldData.group_id && oldData.group_id === g.id) {
                $("#group-selector").prop("selectedIndex", index+1);
            }
        });
    });
});

$('#update-event').submit((e) => {
    e.preventDefault();
    let group = groupSelector.options[groupSelector.selectedIndex].value;
    let date = eventDate.value.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1")
    const data = {
        name: eventName.value,
        description: eventDescription.value,
        date: date
    };

    if(group !== 'none') {
        data.individual = false;
        groups.forEach(g => {
            if(g.name == group) {
                data.group_id = g.id;
            }
        });
        data.owner_id = null;
        console.log(data);
    } else {
        data.individual = true;
        data.owner_id = user.id;
        data.group_id = null;
        console.log(data);
    }

    fetch(URL + "event/" + oldData.id + "?token=" + getToken(), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(event => {
        alert("Evento actualizado");
        localStorage.setItem('event', JSON.stringify(event.evento));
        window.location.href = "updateevent.html";
    });
    
});