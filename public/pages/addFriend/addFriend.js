let search = document.getElementById("search");                
let lista = [];
let user;
let info = document.getElementById("info");
getCurrentUser().then(data =>{
    if(data === undefined){
        window.location.replace("/index.html");
    } else{
        user = data;
    }
}).then(()=>{
    getUsers().then(users =>{
        let filteredUsers = users.filter((u) => { return u.id !== user.id });
        user.friends.forEach((f) => {
            filteredUsers = filteredUsers.filter((u) => {return u.id !== f.friend});
        });
        filteredUsers.forEach(u => lista.push(u.username));
    });
});

function enviar(){
    getCurrentUser().then((user)=>{
        getUserByUsername(search.value).then((userEnviar)=>{
            let sent = false;
            userEnviar.friendRequest.forEach(fr => {
                if(user.id == fr.request.sender) {
                    info.innerHTML='Ya has enviado una solicitud al usuario anteriormente';
                    sent = true;
                }
            });
            userEnviar.friends.forEach(f => {
                if(user.id == f.friend) {
                    info.innerHTML='Ya eres amigo de este usuario';
                    sent = true;
                }
            });
            if(!sent) {
                let data = {
                    sender: user.id,
                    receiver: userEnviar.id
                };
                fetch(`${URL}users/${userEnviar.id}/friend_request?token=${getToken()}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                .then(res => res.json)
                .then(data => {
                    info.innerHTML='Solicitud enviada con éxito';
                });
            }
        });
    });
}

$(search).autocomplete({
    source: lista
});
