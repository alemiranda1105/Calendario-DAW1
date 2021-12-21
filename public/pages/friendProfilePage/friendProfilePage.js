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

let friendID = localStorage.getItem('id');
console.log(friendID);

getCurrentUser().then(user => {
    getUserById(friendID).then(({username, friends}) => {
        nameTxt.innerHTML = username;
        friends.forEach(f => {
            let f_id = f.friend;
            getUserById(f_id).then(friend => {
                if(f_id == user.id) {
                    lista.innerHTML += ` 
                            <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                                <img class="imgFriend" src="/img/avatar.png" alt="">
                                <a href="/pages/profilePage/profilePage.html" class="dataProfileTxt">Tú</a>
                            </div> 
                            `
                            ;
                } else {
                    lista.innerHTML += ` 
                            <div class="friendComponent d-flex flex-column justify-content-center align-items-center">
                                <img class="imgFriend" src="/img/avatar.png" alt="">
                                <p onclick="view(${friend.id})" class="dataProfileTxt">${friend.username}</p>
                            </div> 
                            `
                            ;
                }
            });
        });
    });
});


function view(id){
    localStorage.setItem('id', id);
    window.location.href = "/pages/friendProfilePage/friendProfilePage.html";
}