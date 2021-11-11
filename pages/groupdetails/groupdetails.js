let groupId = localStorage.getItem('groupId');
localStorage.removeItem('groupInfo');
let list = document.getElementById("listUsers");
let groupName = document.getElementById("groupName");
let pencil = document.getElementById("pencil");
let nameAux;
getCurrentUser().then((user) =>{
    getGroupById(groupId).then((group) => {
        //No se escribe el contenido en el input pero al inspeccionar si tiene el contenido correcto
        groupName.value = group.name;
        nameAux = groupName.value ;
        for(let i = 0; i < group.users.length; i++){
            if(group.users[i] == user.id){
                continue;
            } else{
                getUserById(group.users[i]).then(({username}) => {
                    list.innerHTML += `
                            <li class="list-group-item">${username}
                            <img src="/img/close.svg" alt="Eliminar de grupo" class="float-end">
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
