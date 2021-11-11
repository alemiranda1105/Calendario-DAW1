let listado = document.getElementById("textareas");

getCurrentUser().then(({groupid}) =>{
    for(let i = 0; i < groupid.length; i++){
        getGroupById(groupid[i]).then(group =>{
            listado.innerHTML += `
                    <div class="row align-items-center justify-content-center">
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
                                <img src="/img/close.svg" alt="Eliminar de grupo">
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