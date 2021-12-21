
const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

let user;
let groups = [];

getCurrentUser().then(data => {
    if(data === undefined) {
        window.location.replace("/pages/index/index.html")
    } else {
        user = data;
    }
})
.then(() => {
    user.groupid.forEach(({group}) => {
        getGroupById(group).then(g => {
            groups.push(g);
            groupSelector.options[groupSelector.options.length] = new Option(g.id + ". " + g.name);
        });
    });
});

$('#group-form').submit((e) => {
    e.preventDefault();

    var selectedGroup = $("#group-selector option:selected").text();
    selectedGroup = selectedGroup.split(". ");
    const groupId = selectedGroup[0];
    const groupName = selectedGroup[1];
    var individual = !groupName;

    var date = eventDate.value.split("-");
    date = date.reverse();
    var dateStr = "";
    date.forEach(d => dateStr += d + "-");
    dateStr = dateStr.substring(0, dateStr.length-1);

    const data = {
        name: eventName.value,
        description: eventDescription.value,
        date: dateStr,
        individual: individual
    };

    if(individual) {
        data.owner_id = user.id;
    } else {
        data.group_id = parseInt(groupId);
    }
    console.log(data);
    let token = getToken();
    fetch(URL + "event?token=" + token, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(event => {
        alert("Evento creado");
        localStorage.setItem('event', JSON.stringify(event.evento));
        window.location.href = "updateevent.html";
    });

});