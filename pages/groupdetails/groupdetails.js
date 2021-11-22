let groupId = localStorage.getItem('groupId');
localStorage.removeItem('groupInfo');

const friendsSearch = document.getElementById("search");
const list = document.getElementById("listUsers");
const groupName = document.getElementById("groupName");
const pencil = document.getElementById("pencil");
const leaveBtn = document.getElementById("leaveGroup");
let nameAux;

let friends = [];
let friendsName = [];
let groupPeople = [];

function addToGroup(username) {
    list.innerHTML += `
            <li class="list-group-item" id="li${username}">${username}
            <img src="/img/close.svg" onclick="sacarDeGrupo(li${username}) "alt="Eliminar de grupo" class="float-end">
            </li>
    `;
}

getCurrentUser().then((user) => {
    getGroupById(groupId).then((group) => {
        groupName.value = group.name;
        nameAux = groupName.value;
        
        group.users.forEach(id => {
            if(id != user.id) {
                getUserById(id).then(({username, id}) => {
                    groupPeople.push(id);
                    addToGroup(username);
                });
            }
        });
    });
    return user;
}).then(user => {
    user.friends.forEach(id => {
        getUserById(id).then(user => {
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
                addToGroup(newFriend.username);
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

pencil.addEventListener('click', () => cambiaNombre());

function cambiaNombre(){
    if(groupName.disabled){
        groupName.removeAttribute("disabled");
    } else{
        groupName.setAttribute("disabled", true);
        console.log(groupName.value, '-', nameAux);
        if(groupName.value !== nameAux){
            //Escribir nuevo nombre en la base de datos
            console.log('El nombre del grupo ha cambiado');
            nameAux = groupName.value;
        }
    }
}

function sacarDeGrupo(elem){
    elem.remove();
    //Solo se borra el "li" hay que implementar el borrado en la base de datos. 
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
