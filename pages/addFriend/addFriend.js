let search = document.getElementById("search");                
let lista = [];
let user;
let info = document.getElementById("info");
getCurrentUser().then(data =>{
    if(data === undefined){
        window.location.replace("/pages/index/index.html");
    } else{
        user = data
    }
}).then(()=>{
    getUsers().then(users =>{
        let friends = user.friends;
        users.forEach((actual) =>{
            if(friends.includes(''+actual.id)==false && actual.id != user.id){
                lista.push(actual.username);
            }
        });
    });
});

function enviar(){
    console.log(search.value);
    getCurrentUser().then((user)=>{
        getUserByUsername(search.value).then((userEnviar)=>{
            console.log(userEnviar[0].friendRequests);
            if(!userEnviar[0].friendRequests.includes(''+user.id)){
                userEnviar[0].friendRequests.push("" + user.id);
                info.innerHTML='Solicitud enviada con éxito';
            } else{
                info.innerHTML='Ya has enviado una solicitud al usuario anteriormente';
            }
            console.log(userEnviar[0].friendRequests);
        });
    });
}

$(search).autocomplete({
    source: lista
});
