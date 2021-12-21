let lista = document.getElementById("listSolicitudes");

let userData;
getCurrentUser().then(u => {
    userData = u;
    let friendRequest = u.friendRequest
    if(friendRequest.length <= 0) {
        lista.innerHTML = `<h3 style="color: azure;">No tienes ninguna solicitud pendiente</h3>`
    } else {
        for(let i = friendRequest.length-1; i>=0; i--){
            let fr = friendRequest[i].request;
            getUserById(fr.sender).then(user =>{
                lista.innerHTML += 
                `<div class="row d-flex align-items-center justify-content-center" id="row${i}">
                    <div id="contenedorfila" class="fila d-flex align-items-center justify-content-center  border-3 border border-dark bg-light g-gradient">
                        <div class="d-flex align-items-center" id="friend-request"> 
                            <h6 onclick="seeRequestProfile(${user.id})">${user.username}</h6>
                            <div class="botones"> 
                                <button type="button" onclick="acceptRequest(${fr.id},${user.id},row${i})" class="btn bg-blue"> Aceptar</button>
                                <button type="button" onclick="declineRequest(${fr.id},${user.id},row${i})" class="btn btn-danger"> Rechazar </button>
                            </div>
                        </div>
            
                    </div>
                </div>
                `;            
            }); 
        }
    }
});

function acceptRequest(requestID, sender, row){
    let data = {
        "user_id": userData.id,
        "friend_id": sender
    }
    getUserById(sender).then(friend => {
        fetch(URL + "users/add_friend?token=" + getToken(), {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            sessionStorage.setItem('user', JSON.stringify(data));
        })
        .then(() => {
            fetch(URL + "users/" + userData.id + "/friend_request/" + requestID + "?token=" + getToken(), {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            })
            .then(res => row.remove());
        });
    });
}

function declineRequest(requestID, sender, row){
    console.log(requestID);
    console.log(sender);
    console.log("Rechazar solicitud");
    fetch(URL + "users/" + userData.id + "/friend_request/" + requestID + "?token=" + getToken(), {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    })
    .then(res => row.remove());
}

function seeRequestProfile(id){
    localStorage.setItem('id', id);
    localStorage.setItem('url', '/pages/friendRequestPage/friendRequestPage.html');
    window.location.href = "/pages/friendProfilePage/friendProfilePage.html";
}




