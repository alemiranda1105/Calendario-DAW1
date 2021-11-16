let lista = document.getElementById("listSolicitudes");

// Desestructuracion del parámetro
getCurrentUser().then(({friendRequests}) =>{
    console.log(friendRequests);

    for(let i = friendRequests.length-1; i>=0; i--){
        getUserById(friendRequests[i]).then(users =>{
            lista.innerHTML += 
            `<div class="row d-flex align-items-center justify-content-center" id="row${i}">
                <div class="fila d-flex align-items-center justify-content-center  border-3 border border-dark bg-light g-gradient">
                    <div> 
                        <h6>${users.username}</h6>
                    </div>
                    <div class="d-flex botones"> 
                            <button type="button" onclick="acceptRequest(${users.id},row${i})" class="btn bg-blue"> Aceptar</button>
                            <button type="button" onclick="declineRequest(${users.id},row${i})" class="btn btn-danger"> Rechazar </button>
                            <button  type="button" onclick="seeRequestProfile()" class="btn btn-secondary">Ver</button>
                    </div>
                </div>
            </div>
            `;
        }); 
    };
});

function acceptRequest(idRequest, row){
    console.log(idRequest);
    console.log("Aceptar solicitud");
    row.remove();
    //Implementar aceptar solicitud con base de datos
}

function declineRequest(idRequest,row){
    console.log(idRequest);
    console.log("Rechazar solicitud");
    row.remove();
    //Implementar rechazar solicitud con base de datos
}

function seeRequestProfile(){
    //MAL tiene que entrar en el perfil del usuario que envia la solicitud
    window.location.href = "/pages/ProfilePage/profilePage.html";
}




