let listado = document.getElementById("textareas");
let rowactual;
getCurrentUser().then(({id, groupid}) =>{
    if(groupid.length==0){
        listado.innerHTML +=`No está dentro de ningún grupo`;
    }
    for(let i = 0; i < groupid.length; i++){
        getGroupById(groupid[i]).then(group =>{
            rowactual = "row"+i;
            listado.innerHTML += `
                    <div class="row align-items-center justify-content-center" id="row${i}">
                        <div class="fila d-flex align-items-center justify-content-center border-3 border border-dark bg-light bg-gradient">
                            <div class="col-md-4 nGroup"> 
                                <h6>${group.name}</h6>
                            </div>

                            <div class="col-md-2 d-flex cGroup">                            
                                <h6>${group.users.length}</h6>
                                <img src="/img/people.svg" alt="icono grupo">
                            </div>
                        
                            <div class="col-md-2 eGroup"> 
                                <button  type="button" onclick="editar(${group.id})" class="btn btn-secondary"> Editar </button>
                            </div>
                            <div title="Salir del grupo" class="col-md-1 d-flex dGroup">
                                <img src="/img/close.svg" onclick="salirGrupo(${id}, ${group.id}, ${rowactual})" alt="Eliminar de grupo">
                            </div>
                        </div>
                    </div>
            `;
        });
    };
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