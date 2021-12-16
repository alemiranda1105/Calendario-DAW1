
const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

const url = "http://localhost:8000/groups/";

let user;
let groups = [];

getCurrentUser().then(data => {
    if(data === undefined) {
        window.location.replace("http://localhost:5500/pages/index/index.html")
    } else {
        user = data;
    }
})
.then(() => {
    getGroups().then(data => {
        data.forEach(group => {
            let users = group.users;
            for(var i = 0; i < users.length; i++) {
                if(users[i] == user.id) {
                    groups.push(group);
                }
            }
        });
    
        groups.forEach(grupo => {
            groupSelector.options[groupSelector.options.length] = new Option(grupo.id + ". " + grupo.name);
        })
    });
});

$('#group-form').submit((e) => {
    e.preventDefault();

    var selectedGroup = $("#group-selector option:selected").text();
    selectedGroup = selectedGroup.split(". ");
    const groupId = selectedGroup[0];
    const groupName = selectedGroup[1];

    let group = groups.filter(g => g.id == groupId)[0];
    console.log(group.events);

    var date = eventDate.value.split("-");
    date = date.reverse();
    var dateStr = "";
    date.forEach(d => dateStr += d + "-");
    dateStr = dateStr.substring(0, dateStr.length-1);

    const data = {
        "id": group.events.length+1,
        "name": eventName.value,
        "description": eventDescription.value,
        "date": dateStr
    };

    group.events.push(data);
    console.log(group);

    // Actualizar este código para el proximo sprint

    /*fetch(url, {
        method: "PUT",
        body: JSON.stringify(group)
    })
    .then((res) => {
        if(res.ok) {
            alert("Grupo actualizado");
        } else {
            console.log("error");
        }
    });*/

});