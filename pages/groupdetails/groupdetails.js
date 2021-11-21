let groupId = localStorage.getItem('groupId');
localStorage.removeItem('groupInfo');
const list = document.getElementById("listUsers");
const groupName = document.getElementById("groupName");
const pencil = document.getElementById("pencil");
const button = document.getElementById("leaveGroup");
let nameAux;
getCurrentUser().then((user) =>{
    getGroupById(groupId).then((group) => {
        groupName.value = group.name;
        nameAux = groupName.value ;
        for(let i = 0; i < group.users.length; i++){
            if(group.users[i] == user.id){
                continue;
            } else{
                getUserById(group.users[i]).then(({username}) => {
                    list.innerHTML += `
                            <li class="list-group-item" id="li${username}">${username}
                            <img src="/img/close.svg" onclick="sacarDeGrupo(li${username}) "alt="Eliminar de grupo" class="float-end">
                            </li>
                    `;
                });
            }
        };
    });
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

button.addEventListener('click', () => salirGrupo());

function salirGrupo(){
    getCurrentUser().then(user => {
        user.groupid = user.groupid.filter(id => id != groupId);
        sessionStorage.removeItem('user');
        sessionStorage.setItem('user', JSON.stringify([user]));
        window.location.replace("/pages/groupmanagement/groupmanagement.html");
    });
}
