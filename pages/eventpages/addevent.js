
const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

let user;
getCurrentUser().then(data => {
    console.log(data);
    if(data === undefined) {
        window.location.replace("http://localhost:5500/pages/inicio/inicio.html")
    } else {
        user = data;
    }
});

fetch("http://localhost:8000/groups")
.then(res => {
    if(res.ok) {
        return res.json();
    } else {
        throw "Error fetching the API";
    }
})
.then(data => {
    var groups = [];
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
})
.catch(error => console.log(error));

$('#group-form').submit((e) => {
    e.preventDefault();

    var group = $("#group-selector option:selected").text();
    group = group.split(". ");
    const groupId = group[0];
    const groupName = group[1];

    var date = eventDate.value.split("-");
    date = date.reverse();
    var dateStr = "";
    date.forEach(d => dateStr += d + "-");
    dateStr = dateStr.substring(0, dateStr.length-1);
    console.log(dateStr);

    const data = {
        "events": {
            name: eventName.value,
            description: eventDescription.value,
            date: dateStr
        }
    };

    fetch("http://localhost:8000/groups/" + groupId, {
        method: "POST",
        body: data
    })
    .then((res) => {
        if(res.ok) {
            alert("Grupo actualizado");
        } else {
            alert("Error");
        }
    });

});