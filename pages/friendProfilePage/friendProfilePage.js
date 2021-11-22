let id = localStorage.getItem('id');

let goBack = document.getElementById("divGoBack");
let nameTxt = document.getElementById("name");
let lista = document.getElementById("friendBody");


goBack.innerHTML += `
        <div id="goBack" class="d-flex align-items-center">
            <a onclick="back()">
                <div class="d-flex align-items-center">
                    <img src="/img/goBack.svg" alt="Volver">
                    <h6>Volver</h6>
                </div>
            </a>
        </div>
        `;
function back(){
    window.history.back();
}

getCurrentUser().then((user)=>{
    getUserById(id).then(({username, friends}) =>{
        nameTxt.innerHTML += username;
        for(let i = 0; i<friends.length; i++){
            getUserById(friends[i]).then(friend =>{
                if(friend.id == user.id){
                    lista.innerHTML += ` 
                            <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                                <img class="imgFriend" src="/img/avatar.png" alt="">
                                <a href="/pages/profilePage/profilePage.html" class="dataProfileTxt">${friend.username} (Yo)</a>
                            </div> 
                            `
                            ;
                } else{
                    lista.innerHTML += ` 
                            <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                                <img class="imgFriend" src="/img/avatar.png" alt="">
                                <p onclick="view(${friend.id})" class="dataProfileTxt">${friend.username}</p>
                            </div> 
                            `
                            ;
                }
            });
        };
    });
});


function view(id){
    localStorage.setItem('id', id);
    window.location.href = "/pages/friendProfilePage/friendProfilePage.html";
}