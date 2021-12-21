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
                i++;
                listado.innerHTML += `
                    <div class="group-list" id="${rowactual}">
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
        });
    }
});


function editar(group){
    localStorage.setItem('groupId', group);
    window.location.href = "/pages/groupdetails/groupdetails.html";
}

function salirGrupo(id, idg, row){
    let token = getToken();
    let data = {
        user_id: id,
        group_id: idg
    };
    fetch(URL + "group_users/leave_group?token=" + token, {
        headers: {"Content-Type": 'application/json'},
        method: 'DELETE',
        body: JSON.stringify(data)
    })
    .then(res => $(row).remove());
}