
const eventName = document.getElementById("eventName");
const eventDescription = document.getElementById("eventDescription");
const eventDate = document.getElementById("event-date");
const groupSelector = document.getElementById("group-selector");

const user = JSON.parse(sessionStorage.user)[0];

if(user === undefined) {
    window.location.replace("http://localhost:5500/pages/login/login.html")
}

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
    console.log(groups);
    groups.forEach(grupo => {
        groupSelector.options[groupSelector.options.length] = new Option(grupo.id + ". " + grupo.name);
    })
})
.catch(error => console.log(error));

$('#save-button').submit((e) => {
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