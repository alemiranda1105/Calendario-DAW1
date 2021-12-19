let listado = document.getElementById("textareas");
let rowactual;

getCurrentUser().then(user => {
    let id = user.id;
    let groups = user.groupid;
    if(groups.length === 0){
        listado.innerHTML =`No está dentro de ningún grupo`;
    } else {
        var i = 0;
        groups.forEach(g => {
            let gid = g.group;
            getGroupById(gid).then(group => {
                rowactual = "row"+i;

                listado.innerHTML += `
                    <div class="group-list" id="row${i}">
                        <div class="group-details d-flex align-items-center justify-content-center">
                            <h6 id="group-name">${group.name}</h6>
                            <div class="d-flex flex-row">
                                <h6>${group.users.length}</h6>
                                <img src="/img/people.svg" alt="icono grupo" id="group-icon">
                            </div>
                            <button type="button" class="btn bg-grey edit-btn" onclick="editar(${group.id})">Editar</button>
                            <button type="button" class="btn bg-grey edit-btn edit-btn-sm" onclick="editar(${group.id})">
                                <img src="/img/edit-icon.svg" alt="Editar">
                            </button>
                            <button id="delete-btn" onclick="salirGrupo(${id}, ${group.id}, ${rowactual})">
                                <img src="/img/close.svg" alt="Eliminar de grupo">
                            </button>
                        </div>
                    </div>
                `;
            });
            i++;
        });
    }
});


function editar(group){
    localStorage.setItem('groupId', group);
    window.location.href = "/pages/groupdetails/groupdetails.html";
}

function salirGrupo(id, idg, row){
    console.log("IdUsuario: "+id);
    console.log("IdGrupo: "+idg);
    //Borrar row
    row.remove();
/*
    //Borrar del los grupos del usuario el grupo
    getCurrentUser().then(({groupid})=>{
        //ajax borrar de groupid el idg
        try{
            console.info(groupid);
        } catch(error){
            console.error(error);
        }
    });

    //Borrar del grupo al usuario
    getGroupById(idg).then(({users}) =>{
        //ajax borrar de users el id
        try{
          //  console.log(users);
        } catch(error){
            console.error(error);
        }
    });
*/
}