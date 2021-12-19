let groupId = localStorage.getItem('groupId');

const friendsSearch = document.getElementById("search");
const list = document.getElementById("listUsers");
const groupName = document.getElementById("groupName");
const editBtn = document.getElementById("pencil");
const leaveBtn = document.getElementById("leaveGroup");
let nameAux;

let friends = [];
let friendsName = [];
let groupPeople = [];

function addToGroup(username, id) {
    list.innerHTML += `
            <li class="list-group-item" id="li${id}">${username}
            <img src="/img/close.svg" onclick="sacarDeGrupo(li${id},${id})" alt="Eliminar de grupo" class="float-end" id="deleteImg">
            </li>
    `;
}

getCurrentUser().then((user) => {
    getGroupById(groupId).then((group) => {
        groupName.value = group.name;
        nameAux = groupName.value;
        group.users.forEach(u => {
            let u_id = u.user;
            if(u_id != user.id) {
                groupPeople.push(u_id);
                getUserById(u_id).then(({username, id}) => {
                    addToGroup(username, id);
                })
            }
        });
    });
    return user;
}).then(user => {
    user.friends.forEach(({friend}) => {
        getUserById(friend).then(user => {
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
    if(user !== undefined && user) {
        let newFriend = friends.filter(f => f.username === user)[0];
        if(newFriend !== undefined) {
            if(!groupPeople.includes(newFriend.id)) {
                groupPeople.push(newFriend.id);
                addToGroup(newFriend.username, newFriend.id);
                $(friendsSearch).val('');

                /*
                * AÑADIR LLAMADA A LA API PARA GUARDAR LOS CAMBIOS
                */
               
            }
        } else {
            alert("Introduzca un amigo");
        } 
    } else {
        alert("Introduzca un nombre");
    }
});

editBtn.addEventListener('click', () => cambiaNombre());

function cambiaNombre(){
    if(groupName.disabled){
        groupName.removeAttribute("disabled");
    } else{
        groupName.setAttribute("disabled", true);
        console.log(groupName.value, '-', nameAux);
        if(groupName.value !== nameAux && groupName.value !== ''){
            //Escribir nuevo nombre en la base de datos
            console.log('El nombre del grupo ha cambiado');
            nameAux = groupName.value;
        } else {
            groupName.value = nameAux;
        }
    }
}

function sacarDeGrupo(elem, id){
    console.log(id);
    let token = getToken();
    let data = {
        user_id: id,
        group_id: groupId
    };
    fetch(URL + "group_users/leave_group?token=" + token, {
        headers: {"Content-Type": 'application/json'},
        method: 'DELETE',
        body: JSON.stringify(data)
    })
    .then(res => elem.remove());
}

leaveBtn.addEventListener('click', () => salirGrupo());

function salirGrupo(){
    getCurrentUser().then(user => {
        user.groupid = user.groupid.filter(id => id != groupId);
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify([user]));
        window.location.replace("/pages/groupmanagement/groupmanagement.html");
    });
}
