const groupNameInput = document.getElementById("name-input");
const friendsSearch = document.getElementById("search");
const peopleList = document.getElementById("people-list");

let user;
let friends = [];
let friendsName = [];
let addedFriends = [];


function showError(error) {
    const errorTxt = document.getElementById("error-txt");
    errorTxt.innerText = error;
    errorTxt.style.display = "block";
}

function removeUser(user) {
    addedFriends = addedFriends.filter(f => f.username != user);
    console.log(addedFriends);
    if(addedFriends.length <= 0) {
        peopleList.innerText = '';
    } else {
        addedFriends.forEach(f => {
            peopleList.innerHTML += `
                <li class="list-group-item">
                    <h6>${f.username}</h6>
                    <img src="/img/close.svg" id="deleteImg" onclick="javascript:removeUser('${f.username}')" alt="Eliminar de grupo" class="float-end" title="Sacar grupo">
                </li>
            `;
        });
    }
}


getCurrentUser().then(data => {
    if(data === undefined) {
        window.location.replace("/index.html");
    } else {
        user = data;
    }
}).then(() => {
    user.friends.forEach(friend => {
        getUserById(friend.friend).then(user => {
            let friend = {
                "username": user.username,
                "id": user.id
            }
            friends.push(friend);
            friendsName.push(user.username);
        });
    });
});

$(friendsSearch).autocomplete({
    source: friendsName,
});

$('#add-button').click(e => {
    e.preventDefault();

    let user = $(friendsSearch).val();
    if(user !== undefined) {
        let newFriend = friends.filter(f => f.username === user)[0];
        if(newFriend !== undefined) {
            if(!addedFriends.includes(newFriend)) {
                addedFriends.push(newFriend);
                peopleList.innerHTML += `
                    <li class="list-group-item">
                        <h6>${newFriend.username}</h6>
                        <img src="/img/close.svg" id="deleteImg" onclick="javascript:removeUser('${newFriend.username}')" alt="Eliminar de grupo" class="float-end" title="Sacar grupo">
                    </li>
                `;
                $(friendsSearch).val('');
            }
        } else {
            alert("Introduzca un amigo");
        }
    } else {
        alert("Introduzca un nombre");
    }
});

$('#groupCreationForm').submit((e) => {
    e.preventDefault();
    if(addedFriends.length <= 0) {
        showError("Añadir amigos al grupo");
    }else if (groupNameInput.value === 'undefined') {
        showError("Escriba un nombre para el grupo");
    } else {
        let data = {
            name: groupNameInput.value
        };
        console.log(addedFriends[0].id);
        fetch(`${URL}groups?token=${getToken()}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((group_data) => {
            data = {
                group_id: group_data.id
            };
            addedFriends.push(user);
            addedFriends.forEach(user => {
                data.user_id = user.id;
                fetch(`${URL}group_users?token=${getToken()}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(() => window.location.href = "/pages/groupmanagement/groupmanagement.html");
            });
        });
    }
});