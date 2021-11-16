let id = localStorage.getItem('id');
localStorage.removeItem('id');


    //Cambiar ruta del div goBack para poder volver a la página correcta.



let name = document.getElementById("name");
let lista = document.getElementById("friendBody");

getUserById(id).then(({username, friends}) =>{
    name.innerHTML += username;
    for(let i = 0; i<friends.length; i++){
        getUserById(friends[i]).then(friend =>{
            lista.innerHTML += ` 
                        <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                            <img class="imgFriend" src="/img/avatar.png" alt="">
                            <p onclick="view(${friend.id})" class="dataProfileTxt">${friend.username}</p>
                        </div> 
                        `
            ;
        });
    };
});

function view(id){
    localStorage.setItem('id', id);
    window.location.href = "/pages/friendProfilePage/friendProfilePage.html";
}