let lista = document.getElementById("listSolicitudes");
let listUserRequests = [];
const user = { 
    "id" : "",
    "username" : ""
};

// Desestructuracion del parámetro
getCurrentUser().then(({friendRequests}) =>{
    console.log(friendRequests);

    for(let i = friendRequests.length-1; i>=0; i--){
        getUserById(friendRequests[i]).then(users =>{
            user.id = users.id;
            user.username = users.username;
            console.log(user.id, user.username);
            
            lista.innerHTML += 
            `<div class="row d-flex align-items-center justify-content-center">
                <div class="fila d-flex align-items-center justify-content-center  border-3 border border-dark bg-light g-gradient">
                    <div> 
                        <h6>${user.username}</h6>
                    </div>
                    <div class="d-flex botones"> 
                            <button type="button" class="btn bg-blue"> Aceptar</button>
                            <button type="button" class="btn btn-danger"> Rechazar </button>
                            <button  type="button" class="btn btn-secondary">Ver</button>
                    </div>
                </div>
            </div>
            `;

        }); 
    };
});




