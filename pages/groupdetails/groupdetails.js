let groupId = localStorage.getItem('groupId');
localStorage.removeItem('groupInfo');
let list = document.getElementById("listUsers");
let groupName = document.getElementById("groupName");

getCurrentUser().then((user) =>{
    getGroupById(groupId).then((group) => {
        //No se escribe el contenido en el input pero al inspeccionar si tiene el contenido correcto
        groupName.innerHTML = group.name;
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
